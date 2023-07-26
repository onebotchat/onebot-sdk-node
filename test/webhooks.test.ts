import { buildClient } from './client';

describe('webhooks', () => {
  jest.setTimeout(10000)
  const client = buildClient();

  // it('verify', async () => {
  //   let result = client.verifyWebhook(
  //     `{"type":"onebot/conversation_updated","data":{"account":"JTtg4oIp8R-rdWAIvmA2x","active_at":1680274145107,"created_at":1668095818476,"id":"kixVL6qOfz9xLcPe_xzpA","last_message":{"account":"JTtg4oIp8R-rdWAIvmA2x","avatar":"http://wx.qlogo.cn/mmhead/ver_1/jWc0WDia89GyLEIz0kuwwcqazIHWhia8kcchtM9gYg2pjiaCw4Y5xReaicPmtB1aIJIDCaQSk7pGPNt1EHgqpMrHvA/0","conversation_id":"kixVL6qOfz9xLcPe_xzpA","conversation_type":"private","created_at":1680274145107,"flow":"in","from":"NemirNmGN7a7Ml0JpLBQt","id":"7lu7H7GNUbJW2jXOV1hKI","nickname":"许盛","provider":"wechat","revoked":false,"sent_at":1680274145107,"seq":135,"status":"success","text":"在不","to":"JTtg4oIp8R-rdWAIvmA2x","type":"text","updated_at":1680274145107},"pinned":false,"provider":"wechat","type":"private","unread":1,"updated_at":1680274145111}}`,
  //     '6f17421ce761e60bae31cffa8de1473924060f90b546a758b6057261fe243c81',
  //   );
  //   expect(result).toBe(true);

  //   result = client.verifyWebhook(
  //     `{"data":{"account":"JTtg4oIp8R-rdWAIvmA2x","active_at":1680274145107,"created_at":1668095818476,"id":"kixVL6qOfz9xLcPe_xzpA","last_message":{"account":"JTtg4oIp8R-rdWAIvmA2x","avatar":"http://wx.qlogo.cn/mmhead/ver_1/jWc0WDia89GyLEIz0kuwwcqazIHWhia8kcchtM9gYg2pjiaCw4Y5xReaicPmtB1aIJIDCaQSk7pGPNt1EHgqpMrHvA/0","conversation_id":"kixVL6qOfz9xLcPe_xzpA","conversation_type":"private","created_at":1680274145107,"flow":"in","from":"NemirNmGN7a7Ml0JpLBQt","id":"7lu7H7GNUbJW2jXOV1hKI","nickname":"许盛","provider":"wechat","revoked":false,"sent_at":1680274145107,"seq":135,"status":"success","text":"在不","to":"JTtg4oIp8R-rdWAIvmA2x","type":"text","updated_at":1680274145107},"pinned":false,"provider":"wechat","type":"private","unread":1,"updated_at":1680274145111}}`,
  //     '6f17421ce761e60bae31cffa8de1473924060f90b546a758b6057261fe243c81',
  //   );
  //   expect(result).toBe(false);
  // });

  it('get events', async () => {
    const events = await client.getWebhookEvents();
    console.log(events);
  });

  it('get webhooks', async () => {
    const webhooks = await client.getWebhooks();
    console.log(webhooks);
  });

  it('create webhook', async () => {
    const webhook = await client.createWebhook({
      url: 'http://127.0.0.1:9001/echo',
      events: ['message_received', 'conversation_updated'],
    });
    console.log(webhook);
  });

  it('update webhook', async () => {
    const webhook = await client.updateWebhook({
      id: 'fKbindSYvhVQTumiUy5dW',
      events: ['message_received'],
      name: '测试回调',
      active: true,
      secrets: { hello: 'world' },
    });
    console.log(webhook);
  });

  it('delete webhook', async () => {
    await client.deleteWebhook('OeriRkpJibm5_1375vWig');
  });
});
