import { buildClient } from './client';
import { createReadStream, readFileSync } from 'fs';

describe('publish_moments', () => {
  jest.setTimeout(300000);
  const client = buildClient();

  it('publish text moment', async () => {
    const publishReq = client.createTextMoment({
      user_id: "JTtg4oIp8R-rdWAIvmA2x",
      text: '✈️',
    });
    const moment = await client.publishMoment(publishReq);
    console.log(JSON.stringify(moment, undefined, 4));
  });

  it('publish image moment', async () => {
    const publishReq = client.createImageMoment({
      user_id: "JTtg4oIp8R-rdWAIvmA2x",
      upload_files: ['test/resources/test_image.jpeg'],
    });
    const moment = await client.publishMoment(publishReq);
    console.log(JSON.stringify(moment, undefined, 4));
  });

  it('publish video moment', async () => {
    const publishReq = client.createVideoMoment({
      user_id: "JTtg4oIp8R-rdWAIvmA2x",
      upload_files: ['test/resources/test_video.mp4'],
      on_progress: (percent) => {
        console.log('upload progress: ' + percent);
      },
    });
    const moment = await client.publishMoment(publishReq);
    console.log(JSON.stringify(moment, undefined, 4));
  });

  it('send audio message to conversation', async () => {
    const sendReq = client.createAudioMessage({
      conversation_id: 'YwHwFhGk9iZawmbvD4cKq',
      upload_file: 'test/resources/test_audio.m4a',
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send image buffer to conversation', async () => {
    const buf = readFileSync('test/resources/test_audio.m4a');
    const sendReq = client.createAudioMessage({
      conversation_id: '2BzIjJZ0uT_IjnxmT7koD',
      upload_file: buf,
      upload_file_name: 'test_audio.m4a',
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send image stream to conversation', async () => {
    const stream = createReadStream('test/resources/test_audio.m4a');
    const sendReq = client.createAudioMessage({
      conversation_id: '2BzIjJZ0uT_IjnxmT7koD',
      upload_file: stream,
      upload_file_name: 'test_audio.m4a'
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });
});
