import { buildClient } from './client';

describe('groups', () => {
  const client = buildClient();

  it("list account's groups", async () => {
    const resp1 = await client.getGroupList({ account_id: 'gmtIYyV1ovBPegHPVNOKO', limit: 5 });
    expect(resp1.data.length).toBe(5);
    expect(resp1.extra.start_cursor).not.toBe('');
    expect(resp1.extra.end_cursor).not.toBe('');
    expect(resp1.extra.has_next).toBe(true);
    // expect(resp1.extra.has_previous).toBe(false); // TODO 这里错误要修复
    console.log(JSON.stringify(resp1, undefined, 4));

    const resp2 = await client.getGroupList({
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

    const resp3 = await client.getGroupList({ account_id: 'gmtIYyV1ovBPegHPVNOKO', limit: 10 });
    expect(resp3.data[0].id).toBe(resp1.data[0].id);
    expect(resp3.data[4].id).toBe(resp1.data[4].id);
    expect(resp3.data[5].id).toBe(resp2.data[0].id);
    expect(resp3.data[9].id).toBe(resp2.data[4].id);
  });

  it("list account's groups by keyword", async () => {
    const resp = await client.getGroupList({ account_id: 'gmtIYyV1ovBPegHPVNOKO', keyword: '许' });
    console.log(JSON.stringify(resp, undefined, 4));
  });

  it('get group', async () => {
    const group = await client.getGroup('_B1SCP9M6FHFJJAhs5073');
    expect(group.id).toBe('_B1SCP9M6FHFJJAhs5073');
    expect(group.account).toBe('gmtIYyV1ovBPegHPVNOKO');
    console.log(JSON.stringify(group, undefined, 4));
  });

  it("list group's members", async () => {
    const resp1 = await client.getGroupMemberList({ group_id: 'iDkqarf4gCe80wRFysh6_', keyword: '咚' });
    console.log(JSON.stringify(resp1, undefined, 4));
    expect(resp1.data.length).toBe(1);
    const resp2 = await client.getGroupMemberList({ group_id: 'iDkqarf4gCe80wRFysh6_', limit: 2 });
    console.log(JSON.stringify(resp2, undefined, 4));
    const resp3 = await client.getGroupMemberList({
      group_id: 'iDkqarf4gCe80wRFysh6_',
      limit: 2,
      cursor: resp2.extra.end_cursor,
    });
    console.log(JSON.stringify(resp3, undefined, 4));
  });

  it('get group member', async () => {
    const member = await client.getGroupMember('I22vpFe2ohTG-lc0FzBWG');
    expect(member.id).toBe('I22vpFe2ohTG-lc0FzBWG');
    expect(member.group_id).toBe('8Dnz5p1BR5Vq8qobX5jds');
    console.log(JSON.stringify(member, undefined, 4));
  });

  it('mark group', async () => {
    const group1 = await client.markGroup('_B1SCP9M6FHFJJAhs5073', true);
    expect(group1.marked).toBe(true);
    console.log(JSON.stringify(group1, undefined, 4));

    const group2 = await client.markGroup('_B1SCP9M6FHFJJAhs5073', false);
    expect(group2.marked).toBe(false);
    console.log(JSON.stringify(group2, undefined, 4));
  });

  it('set group mute', async () => {
    const group1 = await client.setGroupMute('_B1SCP9M6FHFJJAhs5073', true);
    expect(group1.mute).toBe(true);
    console.log(JSON.stringify(group1, undefined, 4));

    const group2 = await client.setGroupMute('_B1SCP9M6FHFJJAhs5073', false);
    expect(group2.mute).toBe(false);
    console.log(JSON.stringify(group2, undefined, 4));
  });
});
