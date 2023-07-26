import { buildClient } from './client';

describe('conversations', () => {
  jest.setTimeout(300000);
  const client = buildClient();

  it("list account's conversations", async () => {
    const resp1 = await client.getConversationList({ account_id: 'Z-2D0BgAMS2u68s_f6mSJ', limit: 5 });
    expect(resp1.data.length).toBe(5);
    expect(resp1.extra.start_cursor).not.toBe('');
    expect(resp1.extra.end_cursor).not.toBe('');
    expect(resp1.extra.has_next).toBe(true);
    expect(resp1.extra.has_previous).toBe(false); // TODO 这里错误要修复
    console.log(JSON.stringify(resp1, undefined, 4));

    const resp2 = await client.getConversationList({
      account_id: 'gmtIYyV1ovBPegHPVNOKO',
      limit: 5,
      cursor: resp1.extra.end_cursor,
    });
    expect(resp2.data.length).toBe(5);
    expect(resp2.extra.start_cursor).not.toBe('');
    expect(resp2.extra.end_cursor).not.toBe('');
    expect(resp2.extra.has_next).toBe(true);
    expect(resp2.extra.has_previous).toBe(true);
    console.log(JSON.stringify(resp2, undefined, 4));

    const resp3 = await client.getConversationList({ account_id: 'gmtIYyV1ovBPegHPVNOKO', limit: 10 });
    expect(resp3.data[0].id).toBe(resp1.data[0].id);
    expect(resp3.data[4].id).toBe(resp1.data[4].id);
    expect(resp3.data[5].id).toBe(resp2.data[0].id);
    expect(resp3.data[9].id).toBe(resp2.data[4].id);
  });

  it('get conversation', async () => {
    const conversation = await client.getConversation('2BzIjJZ0uT_IjnxmT7koD');
    expect(conversation.id).toBe('2BzIjJZ0uT_IjnxmT7koD');
    expect(conversation.account).toBe('gmtIYyV1ovBPegHPVNOKO');
    console.log(JSON.stringify(conversation, undefined, 4));
  });

  it('get contact conversation', async () => {
    const conversation1 = await client.getContactConversation('uVE-IIcHMK7sqPuLu06HB');
    expect(conversation1.id).toBe('2BzIjJZ0uT_IjnxmT7koD');
    expect(conversation1.account).toBe('gmtIYyV1ovBPegHPVNOKO');
    expect(conversation1.contact?.id).toBe('uVE-IIcHMK7sqPuLu06HB');
    console.log(JSON.stringify(conversation1, undefined, 4));

    const conversation2 = await client.getContactConversation('DAC3tbJAl_ntPbOXdf4x2');
    expect(conversation2.account).toBe('gmtIYyV1ovBPegHPVNOKO');
    expect(conversation2.contact?.id).toBe('DAC3tbJAl_ntPbOXdf4x2');
    console.log(JSON.stringify(conversation2, undefined, 4));
  });

  it('get group conversation', async () => {
    const conversation = await client.getGroupConversation('_B1SCP9M6FHFJJAhs5073');
    expect(conversation.account).toBe('gmtIYyV1ovBPegHPVNOKO');
    console.log(JSON.stringify(conversation, undefined, 4));
  });

  it('set conversation read', async () => {
    const conversation = await client.setConversationRead('2BzIjJZ0uT_IjnxmT7koD');
    expect(conversation.unread).toBe(0);
    console.log(JSON.stringify(conversation, undefined, 4));
  });

  it('delete conversation', async () => {
    await client.deleteConversation('2BzIjJZ0uT_IjnxmT7koD');
  });

  it('pin conversation', async () => {
    const conversation1 = await client.pinConversation('kixVL6qOfz9xLcPe_xzpA', true);
    expect(conversation1.pinned).toBe(true);
    console.log(JSON.stringify(conversation1, undefined, 4));

    const conversation2 = await client.pinConversation('kixVL6qOfz9xLcPe_xzpA', false);
    expect(conversation2.pinned).toBe(false);
    console.log(JSON.stringify(conversation2, undefined, 4));
  });
});
