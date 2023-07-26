import { buildClient } from './client';

describe('messages', () => {
  const client = buildClient();

  it('list conversation messages', async () => {
    const resp1 = await client.getMessageList({ conversation_id: 'kixVL6qOfz9xLcPe_xzpA', limit: 5 });
    expect(resp1.data.length).toBeGreaterThan(0);
    console.log(JSON.stringify(resp1, undefined, 4));

    const resp2 = await client.getMessageList({
      conversation_id: '2BzIjJZ0uT_IjnxmT7koD',
      limit: 5,
      cursor: resp1.extra.end_cursor,
    });
    expect(resp2.data.length).toBeGreaterThan(0);
    console.log(JSON.stringify(resp2, undefined, 4));

    const resp3 = await client.getMessageList({
      conversation_id: '2BzIjJZ0uT_IjnxmT7koD',
      limit: 5,
      cursor: resp2.extra.start_cursor,
      direction: 'before',
    });
    expect(resp3.data.length).toBeGreaterThan(0);
    console.log(JSON.stringify(resp3, undefined, 4));
  });

  it('delete message', async () => {
    const conversation1 = await client.getConversation('2BzIjJZ0uT_IjnxmT7koD');
    const lastMessageId = conversation1.last_message?.id;
    expect(lastMessageId).not.toBe('');
    await client.deleteMessage(lastMessageId!);
    const conversation2 = await client.getConversation('2BzIjJZ0uT_IjnxmT7koD');
    expect(conversation2.last_message).not.toBeUndefined();
    expect(conversation2.last_message).not.toBeNull();
    expect(conversation2.last_message?.id).not.toBe(lastMessageId);
  });
});
