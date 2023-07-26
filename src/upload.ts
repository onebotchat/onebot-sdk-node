import axios from 'axios';
import { nanoid } from 'nanoid';
import COS from 'cos-nodejs-sdk-v5';
import { basename, extname } from 'path';
import {
  ImageAttachment,
  AudioAttachment,
  VideoAttachment,
  MessagePayload,
  MessageType,
  MomentContent,
  MomentType,
  Message,
  Moment,
  FileAttachment,
} from './models';
import { tempWrite, isString } from './helpers';
import { Attachment } from 'types';
import { TokenProvider } from 'token_provider';
import { statSync } from 'fs';

const STORAGE_BASE_URL = 'https://api.growingbox.cn/storage/v1';

/**
 * 上传文件参数
 */
export interface UploadOptions {
  // 为消息上传时指定消息
  message?: Message;
  // 为动态上传时指定动态
  moment?: Moment;
  // 上传进度回调
  onProgress?: (percent: number) => void;
}

/**
 * 上传文件插件接口
 */
export interface UploadPlugin {
  /**
   * 上传文件
   *
   * @param attachment
   * @param options
   */
  upload(attachment: Attachment, options: UploadOptions): Promise<MessagePayload | MomentContent>;
}

/**
 * 默认的上传插件
 */
export class OneBotUploadPlugin implements UploadPlugin {
  private baseUrl: string;
  private tokenProvider: TokenProvider;
  private storageApiToken?: string;
  private storageApiTokenExpiry?: string;

  constructor(baseUrl: string, tokenProvider: TokenProvider) {
    this.baseUrl = baseUrl;
    this.tokenProvider = tokenProvider;
  }

  async upload(attachment: Attachment, options: UploadOptions): Promise<MessagePayload | MomentContent> {
    const { message, moment } = options;
    if (!message && !moment) {
      throw new Error('must have message or moment');
    }

    const { upload_file, upload_file_name } = attachment;
    const filePath = isString(upload_file) ? upload_file : await tempWrite(upload_file, upload_file_name);

    if (message) {
      switch (message.type) {
        case MessageType.Image: {
          return await this.uploadImage(filePath, options);
        }
        case MessageType.Video: {
          return await this.uploadVideo(filePath, options);
        }
        case MessageType.Audio: {
          return await this.uploadAudio(filePath, options);
        }
        case MessageType.File: {
          return await this.uploadFile(filePath, options, upload_file_name)
        }
        default: {
          throw new Error('unsupported message type');
        }
      }
    }

    if (moment) {
      switch (moment.type) {
        case MomentType.Image: {
          return await this.uploadImage(filePath, options);
        }
        case MomentType.Video: {
          return await this.uploadVideo(filePath, options);
        }
        default: {
          throw new Error('unsupported moment type');
        }
      }
    }

    throw new Error('must have message or moment');
  }

  async uploadImage(file: string, options: UploadOptions): Promise<ImageAttachment> {
    const ext = extname(file);
    const path = ext ? `${nanoid()}${ext}` : nanoid();

    const url = await this.doUpload(file, path, options.onProgress);
    const { width, height, size, format } = await this.getImageInfo(url);
    const large = this.getImageThumbnail(url, width, height, 720);
    const thumnail = this.getImageThumbnail(url, width, height, 198);

    return {
      format,
      size,
      infos: [{ url, width, height }, large, thumnail],
    };
  }

  async uploadVideo(file: string, options: UploadOptions): Promise<VideoAttachment> {
    const ext = extname(file);
    const path = ext ? `${nanoid()}${ext}` : nanoid();
    const url = await this.doUpload(file, path, options.onProgress);
    const videoInfo = await this.getVideoInfo(path);
    const snapshot = await this.getVideoSnapshot(path);
    return { url, ...videoInfo, snapshot };
  }

  async uploadAudio(file: string, options: UploadOptions): Promise<AudioAttachment> {
    const ext = extname(file);
    const path = ext ? `${nanoid()}${ext}` : nanoid();
    const url = await this.doUpload(file, path, options.onProgress);
    const audioInfo = await this.getAudioInfo(path);
    return { url, ...audioInfo };
  }

  async uploadFile(file: string, options: UploadOptions, filename?: string): Promise<FileAttachment> {
    const stats = statSync(file)
    const size = stats.size
    const ext = extname(file);
    const name = filename ?? basename(file)
    const path = ext ? `${nanoid()}${ext}` : nanoid();
    const format = ext ? ext.slice(1, ext.length) : ""
    const url = await this.doUpload(file, path, options.onProgress);
    return { url, name, format, size };
  }

  getImageThumbnail(url: string, width: number, height: number, thumbSize: number): ThumbnailInfo {
    const min = width <= height ? width : height;
    if (min <= thumbSize) {
      // 最小边小于缩略图尺寸，直接使用原图
      return { url, width, height };
    } else if (height <= width) {
      // 最小边是高，按高等比缩放
      return {
        url: this.getThumbnailUrl(url, thumbSize),
        width: Math.ceil((width * thumbSize) / height),
        height: thumbSize,
      };
    } else {
      // 最小边是宽，按宽缩放
      return {
        url: this.getThumbnailUrl(url, thumbSize),
        width: thumbSize,
        height: Math.ceil((height * thumbSize) / width),
      };
    }
  }

  async getVideoInfo(path: string): Promise<VideoInfo> {
    const token = await this.getStorageApiToken();
    const { data } = await axios.get<VideoInfo>(STORAGE_BASE_URL + '/video_info', {
      params: {
        path,
        provider: 'qcloud',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data.format) {
      data.format = extname(path);
      data.format = data.format ? data.format.slice(1, data.format.length) : '';
    }
    return data;
  }

  async getVideoSnapshot(path: string): Promise<string> {
    const token = await this.getStorageApiToken();
    const { data } = await axios.get<{ url: string }>(STORAGE_BASE_URL + '/video_snapshot', {
      params: {
        path,
        provider: 'qcloud',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.url;
  }

  async getAudioInfo(path: string): Promise<AudioInfo> {
    const token = await this.getStorageApiToken();
    const { data } = await axios.get<AudioInfo>(STORAGE_BASE_URL + '/audio_info', {
      params: {
        path,
        provider: 'qcloud',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data.format) {
      data.format = extname(path);
      data.format = data.format ? data.format.slice(1, data.format.length) : '';
    }
    return data;
  }

  async getImageInfo(url: string): Promise<ImageInfo> {
    const { data } = await axios.get<QCloudImageInfo>(`${url}?imageInfo`);
    return {
      width: parseInt(data.width, 10),
      height: parseInt(data.height, 10),
      size: parseInt(data.size, 10),
      format: data.format ?? '',
    };
  }

  getThumbnailUrl(url: string, size: number): string {
    return `${url}?imageView2/3/w/${size}/h/${size}`;
  }

  async doUpload(file: string, path: string, onProgress?: (percent: number) => void): Promise<string> {
    const token = await this.getStorageApiToken();
    const { data } = await axios.get<TemporaryCredentials>(STORAGE_BASE_URL + '/temporary_credentials', {
      params: {
        path,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const credentials = data.credentials as any;
    const cos = new COS({
      getAuthorization(_options, callback) {
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          SecurityToken: credentials.sessionToken,
          StartTime: credentials.startTime,
          ExpiredTime: credentials.expiredTime,
        });
      },
    });
    await cos.sliceUploadFile({
      Bucket: data.bucket,
      Region: data.region,
      Key: path,
      FilePath: file,
      onProgress: (params) => {
        onProgress && onProgress(params.percent);
      },
    });
    return data.url;
  }

  async getStorageApiToken(): Promise<string | null> {
    let token = this.storageApiToken;
    const expiryStr = this.storageApiTokenExpiry;
    let expiry = expiryStr ? new Date(expiryStr) : new Date();
    const needRefresh = !token || expiry <= new Date();

    if (needRefresh) {
      // 需要刷新 accessToken
      const accessToken = await this.tokenProvider.getAccessToken();
      const { data } = await axios.get<{
        access_token: string;
        expiry: string;
      }>(`${this.baseUrl}/xapis_token`, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      });
      token = data.access_token;
      expiry = new Date(data.expiry);
      this.storageApiToken = token;
      this.storageApiTokenExpiry = expiry.toISOString();
    }
    return this.storageApiToken ?? '';
  }
}

interface TemporaryCredentials {
  bucket: string;
  provider: string;
  region: string;
  url: string;
  cdn?: string;
  credentials?: any;
}

interface ThumbnailInfo {
  height: number;
  url: string;
  width: number;
}

interface QCloudImageInfo {
  height: string;
  size: string;
  width: string;
  format?: string;
}

interface ImageInfo {
  format: string;
  height: number;
  size: number;
  width: number;
}

interface AudioInfo {
  duration: number;
  format: string;
  size: number;
}

interface VideoInfo {
  duration: number;
  format: string;
  height: number;
  size: number;
  width: number;
}
