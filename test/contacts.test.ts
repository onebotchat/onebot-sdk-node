import { buildClient } from './client';

describe('contacts', () => {
  const client = buildClient();

  it("list account's contacts", async () => {
    const resp1 = await client.getContactList({ account_id: 'gmtIYyV1ovBPegHPVNOKO', limit: 5 });
    expect(resp1.data.length).toBe(5);
    expect(resp1.extra.start_cursor).not.toBe('');
    expect(resp1.extra.end_cursor).not.toBe('');
    expect(resp1.extra.has_next).toBe(true);
    // expect(resp1.extra.has_previous).toBe(false); // TODO 这里错误要修复
    console.log(JSON.stringify(resp1, undefined, 4));

    const resp2 = await client.getContactList({
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

    const resp3 = await client.getContactList({ account_id: 'gmtIYyV1ovBPegHPVNOKO', limit: 10 });
    expect(resp3.data[0].id).toBe(resp1.data[0].id);
    expect(resp3.data[4].id).toBe(resp1.data[4].id);
    expect(resp3.data[5].id).toBe(resp2.data[0].id);
    expect(resp3.data[9].id).toBe(resp2.data[4].id);
  });

  it("list account's contacts by keyword", async () => {
    const resp = await client.getContactList({ account_id: 'JTtg4oIp8R-rdWAIvmA2x', keyword: '增长' });
    console.log(JSON.stringify(resp, undefined, 4));
  });

  it('get contact', async () => {
    const contact = await client.getContact('c_7ph1oQe9KPDTaA8Ke4d');
    expect(contact.id).toBe('c_7ph1oQe9KPDTaA8Ke4d');
    expect(contact.account).toBe('gmtIYyV1ovBPegHPVNOKO');
    console.log(JSON.stringify(contact, undefined, 4));
  });

  it('delete contact', async () => {
    await client.deleteContact('c_7ph1oQe9KPDTaA8Ke4d');
  });

  it('mark contact', async () => {
    const contact1 = await client.markContact('_5kwD2S4tJ-sXq5aCRD91', true);
    expect(contact1.marked).toBe(true);
    console.log(JSON.stringify(contact1, undefined, 4));

    const contact2 = await client.markContact('_5kwD2S4tJ-sXq5aCRD91', false);
    expect(contact2.marked).toBe(false);
    console.log(JSON.stringify(contact2, undefined, 4));
  });
});
