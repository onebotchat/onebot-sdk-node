import { buildClient } from './client';
import { createReadStream, readFileSync } from 'fs';

describe('send_messages', () => {
  jest.setTimeout(300000);
  const client = buildClient();

  it('send text message to conversation', async () => {
    const sendReq = client.createTextMessage({
      conversation_id: 'zGnJQvCkhcZvri4G_DVSa',
      text: '我在的',
    });
    const messageId = sendReq.id;
    console.log('message id: %s', messageId);
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
    expect(message.id).toBe(messageId);
  });

  it('send text message to contact', async () => {
    const sendReq = client.createTextMessage({
      from: 'gmtIYyV1ovBPegHPVNOKO',
      to: 'JE_6WV5MK7wSpxiarPL9y',
      text: '应该可以了',
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send text message to group', async () => {
    const sendReq = client.createTextMessage({
      from: 'JTtg4oIp8R-rdWAIvmA2x',
      to: 'fnj4eTovvjF4trcChJd_f',
      text: '应该可以了',
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send text message to group mention users', async () => {
    const sendReq = client.createTextMessage({
      from: 'Rm4ZoV9W6t9c9dv_4fOE2',
      to: 'mZ1d0MJAYxGKN-zocqc5e',
      text: '@许盛 你在干嘛啊，回答一下@AI连接未来 ， 等急了@咚咚锵锵',
      mentioned_users: ["IG54juwUcGbt4AF4RFL90", "Rm4ZoV9W6t9c9dv_4fOE2", "viPUTAXCxMvBGMhpX5q1b"]
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send image message to conversation', async () => {
    const sendReq = client.createImageMessage({
      conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      upload_file: 'test/resources/test_image.jpeg',
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send video attachment to conversation', async () => {
    const sendReq = client.createVideoMessage({
      conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      video: {
        url: "https://d-id-talks-prod.s3.us-west-2.amazonaws.com/auth0%7C643aa6de983376898fcd1cd4/tlk_KOON7ifWI5KX3S5I9gHiv/1682668887855.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1682755293&Signature=tMPNG5fJLnuNqigQIVR37P8tg8A%3D",
        duration: 8,
        width: 512,
        height: 512,
        size: 567922,
        snapshot: "https://d-id-talks-prod.s3.us-west-2.amazonaws.com/auth0%7C643aa6de983376898fcd1cd4/tlk_KOON7ifWI5KX3S5I9gHiv/source/mushroomcloudus_A_Greek_beauty._e54ab765-e0ce-4add-9fa0-0980a3dfdc48.png?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1682755287&Signature=qVTFYpx8lSRlTbZGk205efiSe8I%3D"
      }
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send video message to conversation', async () => {
    const sendReq = client.createVideoMessage({
      conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      upload_file: 'test/resources/test_video.mp4',
      on_progress: (percent) => {
        console.log('upload progress: ' + percent);
      },
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send miniprogram message to conversation', async () => {
    const sendReq = client.createMiniProgramMessage({
      conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      miniprogram: {
        content: "<?xml version=\"1.0\"?> <msg> <appmsg appid=\"\" sdkver=\"0\"> <title>愤怒的小蜗牛 的创作</title> <des>愤怒的小蜗牛 的创作</des> <type>33</type> <url>https://mp.weixin.qq.com/mp/waerrpage?appid=wxe66c6cf31faca8f0&amp;type=upgrade&amp;upgradetype=3#wechat_redirect</url> <appattach>\n<cdnthumburl>3051020100044a304802010002031c850902033d14bc02046bca8472020464552444042465386237366438332d663064332d343762382d626338312d6231303062386337336337380204011808030201000400</cdnthumburl> <cdnthumbmd5>e68aa7509f3cde2641d0a8ba263533bd</cdnthumbmd5> <cdnthumblength>102728</cdnthumblength> <cdnthumbwidth>720</cdnthumbwidth> <cdnthumbheight>576</cdnthumbheight> <cdnthumbaeskey>268d4862b5e44ecc3a0edc9ff9d61c47</cdnthumbaeskey> <aeskey>268d4862b5e44ecc3a0edc9ff9d61c47</aeskey> <encryver>0</encryver> <filekey>wxid_xvh6upfufvih22_413_1683301487</filekey>\n</appattach> <sourceusername>gh_011d9be46cf8@app</sourceusername> <sourcedisplayname>AI艺术玩家</sourcedisplayname> <recorditem><![CDATA[(null)]]></recorditem> <weappinfo> <username><![CDATA[gh_011d9be46cf8@app]]></username> <appid><![CDATA[wxe66c6cf31faca8f0]]></appid> <type>2</type> <version>1</version> <weappiconurl><![CDATA[http://mmbiz.qpic.cn/mmbiz_png/IHH8ZPPUpJRXvekSibUSnAIrmQW7HuozaCRqR9Aqc1zyFEYVibmzMMlG4iaxHVfibWpbQflC32u1okLNHh3e5oADlg/640?wx_fmt=png&wxfrom=200]]></weappiconurl> <pagepath><![CDATA[pages/detail/index.html?id=clhhvzrtb0011hu017a7qdb38]]></pagepath> <shareId><![CDATA[0_wxe66c6cf31faca8f0_bad255c872821c954c3a6fe6d1f5a89c_1683214569_0]]></shareId> <appservicetype>0</appservicetype> <brandofficialflag>0</brandofficialflag> <showRelievedBuyFlag>0</showRelievedBuyFlag> <flagshipflag>0</flagshipflag> <subType>0</subType> <isprivatemessage>0</isprivatemessage><weapppagethumbrawurl><![CDATA[https://aigcstore.oss-cn-shenzhen.aliyuncs.com/angryalan_On_the_way_home_from_work_late_at_night_the_exhausted_13c5fed5-2440-4256-ac15-0d2eebe2bafb.png]]></weapppagethumbrawurl></weappinfo> </appmsg> <scene>0</scene> <appinfo> <version>1</version> <appname></appname> </appinfo> <commenturl></commenturl> </msg>",
        cover: "https://aigcstore.oss-cn-shenzhen.aliyuncs.com/angryalan_Generate_a_prompt_for_Midjourneys_artificial_intellig_df9b3fef-c0e8-48c5-a29c-d23e9f2b2587.png",
      }
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  })

  it('send file message to conversation', async () => {
    const sendReq = client.createFileMessage({
      conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      upload_file: 'test/resources/test_large_image.png',
      upload_file_name: '测试图片.png',
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  })

  it('send file attachment to conversation', async () => {
    const sendReq = client.createFileMessage({
      conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      file: {
        url: 'https://cdn.onebot.chat/m1RcGxpW5wQqsr7XUSLV2.docx',
        // name: '测试文档.docx'
      }
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  })

  it('send link attachment to conversation', async () => {
    const sendReq = client.createLinkMessage({
      conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      link: {
        url: 'https://www.163.com/money/article/I43EE07900259K2Q.html',
        title: '巴菲特：对人工智能有点担心',
        description: '伯克希尔哈撒韦公司CEO沃伦·巴菲特一开始打趣称自己不懂AI、机器人后，正儿八经地表示，他不认为会有AI能取代人类的基因，但AI可以做一系列非常棒的事情。',
        image: 'https://nimg.ws.126.net/?url=http://bjnewsrec-cv.ws.126.net/little631d9d44305j00ru8ob5003jc001b800vhg.jpg&thumbnail=140y88&quality=80&type=jpg'
      }
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  })

  it('send audio message to conversation', async () => {
    const sendReq = client.createAudioMessage({
      // conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      conversation_id: 'kPZSlIID6YH0LCGbIdIsm',
      upload_file: 'test/resources/test_audio.m4a',
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });

  it('send audio attachment to conversation', async () => {
    const sendReq = client.createAudioMessage({
      // conversation_id: 'kixVL6qOfz9xLcPe_xzpA',
      conversation_id: 'kPZSlIID6YH0LCGbIdIsm',
      audio: {
        url: "https://aigcstore.oss-cn-shenzhen.aliyuncs.com/s_Vcnecy4hVI1iuujpUBe_voice.mp3",
        duration: 13
      }
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
      // upload_file_name: 'test_audio.m4a'
    });
    const message = await client.sendMessage(sendReq);
    console.log(JSON.stringify(message, undefined, 4));
  });
});
