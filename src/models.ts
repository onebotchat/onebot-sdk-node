// cspell:disable-file

// 翻页查询结果
export interface PageList<T> {
  // 数据列表
  data: Array<T>;
  extra: {
    // 查询数量
    limit: number;
    // 查询起始位置
    offset: number;
    // 总数量
    total: number;
  };
}

// 翻页查询请求
export type PageListParameters<T> = T & {
  // 查询数量
  limit?: number;
  // 查询起始位置
  offset?: number;
};

// 游标
export type Cursor = string | number;

// 游标方向
export type CursorDirection = 'after' | 'before';

// 游标查询请求
export type CursorListParameters<T> = T & {
  // 游标
  cursor?: Cursor;
  // 查询方向
  direction?: CursorDirection;
  // 查询数量
  limit?: number;
};

// 游标查询结果
export interface CursorList<T> {
  // 数据列表
  data: Array<T>;
  extra: {
    // 是否有之后的数据
    has_next: boolean;
    // 是否有之前的数据
    has_previous: boolean;
    // 查询数量
    limit: number;
    // 结束游标
    end_cursor?: Cursor;
    // 开始游标
    start_cursor?: Cursor;
  };
}

// 性别
export enum Gender {
  // 女
  Female = 'female',
  // 男
  Male = 'male',
  // 未设置
  Unknown = 'unknown',
}

// 用户s
export interface User {
  // 用户ID
  id: string;
  // 平台用户ID，如：抖音ID
  open_id: string;
  // 平台，如：douyin
  provider: string;
  // 地址
  address?: string;
  // 头像URL
  avatar?: string;
  // 生日
  birthday?: number;
  // 城市
  city?: string;
  // 公司
  company?: string;
  // 国家
  country?: string;
  // 用户自定义ID，如：抖音号
  custom_id?: string;
  // 部门
  department?: string;
  // 区
  district?: string;
  // 邮箱
  email?: string;
  // 性别
  gender?: Gender;
  // 语言
  language?: string;
  // 手机号
  mobile?: string;
  // 昵称
  nickname?: string;
  // 省份
  province?: string;
  // 二维码URL
  qrcode?: string;
  // 真实姓名
  real_name?: string;
  // 签名
  signature?: string;
  // 座机电话
  tel?: string;
  // 头衔、职位
  title?: string;
  // 账户名
  username?: string;
}

// 在线状态
export enum Precense {
  // 在线
  Active = 'active',
  // 封号
  Banned = 'banned',
  // 停用
  Disabled = 'disabled',
  // 掉线
  Disconnected = 'disconnected',
  // 未激活
  Inactive = 'inactive',
}

// 账号
export interface Account extends User {
  // 账号ID
  id: string;
  // 在线状态
  presence: Precense;
  // 创建时间
  created_at?: number;
  // 扩展信息
  metadata?: Record<string, unknown>;
  // 账号总的未读数量
  unread?: number;
  // 最后更新时间
  updated_at?: number;
}

// 好友
export interface Contact extends User {
  // 归属账号ID
  account: string;
  // 好友ID
  id: string;
  // 好友的用户ID，多个账号添加同一个用户为好友，每组好友关系有不同的好友ID，但是好友的用户ID相同
  user_id: string;
  // 备注名
  alias?: string;
  // 是否加入黑名单
  blocked?: boolean;
  // 创建时间
  created_at?: number;
  // 是否星标
  marked?: boolean;
  // 扩展信息
  metadata?: Record<string, unknown>;
  // 备注说明
  remark?: string;
  // 标签
  tags?: Array<string>;
  // 最后更新时间
  updated_at?: number;
}

// 好友申请状态
export enum FriendApplicationStatus {
  // 已通过
  Accepted = 'accepted',
  // 已过期
  Expired = 'expired',
  // 已拒绝
  Rejected = 'rejected',
  // 待处理
  Unhandled = 'unhandled',
}

// 好友申请
export interface FriendApplication {
  // 归属账号ID
  account: string;
  // 申请ID
  id: string;
  // 平台用户ID，如：抖音ID
  open_id: string;
  // 平台，如：douyin
  provider: string;
  // 状态
  status: FriendApplicationStatus;
  // 头像URL
  avatar?: string;
  // 城市
  city?: string;
  // 公司
  company?: string;
  // 国家
  country?: string;
  // 用户自定义ID，如：抖音号
  custom_id?: string;
  // 部门
  department?: string;
  // 区
  district?: string;
  // 性别
  gender?: Gender;
  // 申请留言
  hello_message?: string;
  // 昵称
  nickname?: string;
  // 省份
  province?: string;
  // 真实姓名
  real_name?: string;
  // 签名
  signature?: string;
  // 申请来源
  source?: string;
  // 头衔、职位
  title?: string;
}

// 会话类型
export enum ConversationType {
  // 群聊
  Group = 'group',
  // 私聊
  Private = 'private',
  // 系统通知
  System = 'system',
}

// 会话
export interface Conversation {
  // 所属账号ID
  account: string;
  // 最后活跃时间
  active_at: number;
  // 会话ID
  id: string;
  // 是否置顶
  pinned: boolean;
  // 平台
  provider: string;
  // 会话类型
  type: ConversationType;
  // 未读消息数量
  unread: number;
  // 私聊会话时，对方是好友，返回的好友资料
  contact?: Contact;
  // 创建时间
  created_at?: number;
  // 群聊会话时，对方是群组，返回的群组资料
  group?: Group;
  // 最后消息
  last_message?: Message;
  // 扩展信息
  metadata?: Record<string, unknown>;
  // 最后更新时间
  updated_at?: number;
  // 私聊会话时，对方是陌生人，返回的用户资料
  user?: User;
}

// 消息类型
export enum MessageType {
  // 语音消息
  Audio = 'audio',
  // 聊天记录消息
  ChatHistory = 'chat_history',
  // 文件消息
  File = 'file',
  // 图片消息
  Image = 'image',
  // 分享链接消息
  Link = 'link',
  // 直播间消息
  Live = 'live',
  // 地理位置消息
  Location = 'location',
  // 小程序消息
  Miniprogram = 'miniprogram',
  // 音乐消息
  Music = 'music',
  // 笔记消息
  Note = 'note',
  // 公众号名片消息
  OfficialCard = 'official_card',
  // 文本消息
  Text = 'text',
  // 好友名片消息
  UserCard = 'user_card',
  // 视频消息
  Video = 'video',
  // 视频号名片消息
  VideoCard = 'video_card',
  // 视频号动态消息
  VideoFeed = 'video_feed',
}

// 消息发送状态
export enum MessageStatus {
  // 发送失败
  Fail = 'fail',
  // 发送中
  Sending = 'sending',
  // 发送成功
  Success = 'success',
  // 未发送
  Unsent = 'unsent',
}

// 消息发送方向
export enum MessageFlow {
  // 接收消息
  In = 'in',
  // 发出消息
  Out = 'out',
}

export const MESSAGE_MENTIONED_ALL = '@all';

// 消息
export interface Message {
  // 所属账号ID
  account: string;
  // 所属会话ID
  conversation_id: string;
  // 所属会话类型
  conversation_type: ConversationType;
  // 消息的流向
  flow: MessageFlow;
  // 发送人ID
  from: string;
  // 消息ID
  id: string;
  // 平台
  provider: string;
  // 发送时间
  sent_at: number;
  // 消息编号，在会话内递增
  seq: number;
  // 状态
  status: MessageStatus;
  // 接收人ID/接受群组ID
  to: string;
  // 消息类型
  type: MessageType;
  // 语音消息内容
  audio?: AudioAttachment;
  // 发送人头像
  avatar?: string;
  // 创建时间
  created_at?: number;
  // 图片消息内容
  image?: ImageAttachment;
  // 群文本消息@用户ID列表，如果是 @all 则是 MESSAGE_MENTIONED_ALL
  mentioned_users?: Array<string>;
  // 扩展信息
  metadata?: Record<string, unknown>;
  // 发送人昵称
  nickname?: string;
  // 是否撤回
  revoked?: boolean;
  // 文本消息内容
  text?: string;
  // 最后更新时间
  updated_at?: number;
  // 视频消息内容
  video?: VideoAttachment;
  // 小程序消息内容
  miniprogram?: MiniProgramAttachment;
  // 文件消息内容
  file?: FileAttachment;
  // 链接
  link?: LinkAttachment;
}

// 图片消息内容
export interface ImageAttachment {
  // 图片信息，索引0是原图，1是中图，2是小图
  infos: Array<{
    // 图片地址
    url: string;
    // 高度（像素）
    height?: number;
    // 宽度（像素）
    width?: number;
  }>;
  // 格式
  format?: string;
  // 文件md5校验
  md5?: string;
  // 原图大小（字节）
  size?: number;
}

// 语音消息内容
export interface AudioAttachment {
  // 语音地址
  url: string;
  // 时长（秒）
  duration?: number;
  // 格式
  format?: string;
  // 文件md5校验
  md5?: string;
  // 大小（字节）
  size?: number;
}

// 视频消息内容
export interface VideoAttachment {
  // 视频地址
  url: string;
  // 时长（秒）
  duration?: number;
  // 格式
  format?: string;
  // 高度（像素）
  height?: number;
  // 文件md5校验
  md5?: string;
  // 大小（字节）
  size?: number;
  // 封面图
  snapshot?: string;
  // 宽度（像素）
  width?: number;
}

// 小程序消息内容
export interface MiniProgramAttachment {
  // 小程序内容
  content: string;
  // 标题
  title?: string;
  // 描述
  description?: string;
  // 封面图
  cover?: string;
}

// 文件内容
export interface FileAttachment {
  // 文件地址
  url: string;
  // 文件名
  name?: string;
  // 格式
  format?: string;
  // 文件md5校验
  md5?: string;
  // 大小（字节）
  size?: number;
}

// 消息内容
export type MessagePayload = string | ImageAttachment | AudioAttachment | VideoAttachment | MiniProgramAttachment | FileAttachment;

// 群组
export interface Group {
  // 所属账号ID
  account: string;
  // 所属账号在群组内的群成员信息
  account_member_info: GroupMember;
  // 群组ID
  id: string;
  // 平台
  provider: string;
  // 群组备注名
  alias?: string;
  // 群公告
  announcement?: string;
  // 群组头像
  avatar?: string;
  // 创建时间
  created_at?: number;
  // 简介
  description?: string;
  // 是否星标
  marked?: boolean;
  // 群成员数量
  member_count?: number;
  // 是否全体禁言，禁言后无法接收消息
  mute?: boolean;
  // 群组名称
  name?: string;
  // 群主用户ID
  owner?: string;
  // 群二维码
  qrcode?: string;
  // 备注说明
  remark?: string;
  // 最后更新时间
  updated_at?: number;
}

// 群成员角色
export enum GroupMemberRole {
  // 管理员
  Admin = 'admin',
  // 普通成员
  Member = 'member',
  // 群主
  Owner = 'owner',
}

// 群成员
export interface GroupMember {
  // 所属群组ID
  group_id: string;
  // 群成员ID
  id: string;
  // 角色
  role: GroupMemberRole;
  // 群成员的用户ID
  user_id: string;
  // 群内昵称
  alias?: string;
  // 头像
  avatar?: string;
  // 创建时间
  created_at?: number;
  // 性别
  gender?: Gender;
  // 入群时间
  joined_at?: number;
  // 昵称
  nickname?: string;
  // 最后更新时间
  updated_at?: number;
}

// 入群申请状态
export type GroupApplicationStatus = FriendApplicationStatus;

// 入群申请
export interface GroupApplication {
  // 所属账号ID
  account: string;
  // 群组ID
  group_id: string;
  // 申请ID
  id: string;
  // 平台用户ID，如：抖音ID
  open_id: string;
  // 平台，如：douyin
  provider: string;
  // 状态
  status: GroupApplicationStatus;
  // 头像URL
  avatar?: string;
  // 城市
  city?: string;
  // 公司
  company?: string;
  // 国家
  country?: string;
  // 用户自定义ID，如：抖音号
  custom_id?: string;
  // 部门
  department?: string;
  // 区
  district?: string;
  // 性别
  gender?: Gender;
  // 申请留言
  hello_message?: string;
  // 昵称
  nickname?: string;
  // 省份
  province?: string;
  // 真实姓名
  real_name?: string;
  // 签名
  signature?: string;
  // 申请来源
  source?: string;
  // 头衔、职位
  title?: string;
}

// 入群邀请状态
export type GroupInvitationStatus = FriendApplicationStatus;

// 入群邀请
export interface GroupInvitation {
  // 所属账号ID
  account: string;
  // 群组ID
  group_id: string;
  // 邀请ID
  id: string;
  // 平台，如：douyin
  provider: string;
  // 状态
  status: GroupInvitationStatus;
  // 群组头像
  group_avatar?: string;
  // 群组名称
  group_name?: string;
  // 邀请留言
  hello_message?: string;
  // 邀请人头像URL
  inviter_avatar?: string;
  // 邀请人昵称
  inviter_name?: string;
  // 邀请来源
  source?: string;
}

export enum MomentType {
  // 图片动态
  Image = 'image',
  // 链接
  Link = 'link',
  // 文字动态
  Text = 'text',
  // 视频动态
  Video = 'video',
}

// 动态发布状态
export enum MomentStatus {
  // 发布失败
  Fail = 'fail',
  // 发布中
  Publishing = 'publishing',
  // 发布成功
  Success = 'success',
  // 未发布
  Unpublished = "unpublished"
}

// 用户动态
export interface Moment {
  // 动态ID
  id: string;
  // 平台
  provider: string;
  // 发布时间
  published_at: number;
  // 动态类型
  type: MomentType;
  // 发布用户ID
  user_id: string;
  // 发布人头像
  avatar?: string;
  // 评论数
  comment_count?: number;
  // 评论列表
  comments?: CursorList<Comment>;
  // 创建时间
  created_at?: number;
  // 图片
  images?: Array<ImageAttachment>;
  // 点赞数
  like_count?: number;
  // 点赞列表
  likes?: CursorList<Like>;
  // 链接
  link?: LinkAttachment;
  // 扩展信息
  metadata?: Record<string, unknown>;
  // 发布人昵称
  nickname?: string;
  // 文案
  text?: string;
  // 最后更新时间
  updated_at?: number;
  // 视频
  video?: VideoAttachment;
  // 小程序
  miniprogram?: MiniProgramAttachment;
  // 文件
  file?: FileAttachment
}

// 链接动态内容
export interface LinkAttachment {
  // 链接地址
  url: string;
  // 描述
  description?: string;
  // 图片
  image?: string;
  // 缩略图片
  thumbnail?: string;
  // 标题
  title?: string;
}

// 动态内容类型
export type MomentContent = ImageAttachment | VideoAttachment | MiniProgramAttachment | FileAttachment | LinkAttachment;

// 评论
export interface Comment {
  // 评论ID
  id: string;
  // 发表评论用户ID
  user_id: string;
  // 发表评论用户头像
  avatar?: string;
  // 评论时间
  commented_at?: number;
  // 发表评论用户名称
  nickname?: string;
  // 回复的评论，多级回复，这里只向上追溯一级
  reply_to?: Comment;
  // 评论文案
  text?: string;
}

// 点赞
export interface Like {
  // 点赞用户ID
  user_id: string;
  // 点赞用户头像
  avatar?: string;
  // 点赞用户名称
  nickname?: string;
}

// 回调
export interface Webhook {
  // 是否启用
  active: boolean;
  // 订阅的事件
  events: string[];
  // 回调ID
  id: string;
  // 回调地址
  url: string;
  // 回调描述
  description?: string;
  // 回调名称
  name?: string;
  // 用户自定义数据
  secrets?: any;
}

// 回调事件
export interface WebhookEvent {
  // 事件ID
  id: string;
  // 事件类型
  type: string;
  // 事件描述
  description?: string;
  // 事件名称
  name?: string;
}
