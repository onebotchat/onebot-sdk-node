import { buildClient } from './client';

describe('moments', () => {
  jest.setTimeout(300000);
  const client = buildClient();

  it("get user's moment list", async () => {
    const resp1 = await client.getUserMomentList({
      account_id: 'gmtIYyV1ovBPegHPVNOKO',
      user_id: 'SRwG1F4on3FOAA-mqsaYB',
    });
    console.log(JSON.stringify(resp1, undefined, 4));
  });

  it("get account's moment list in box", async () => {
    const resp1 = await client.getAccountMomentListInbox({ account_id: 'gmtIYyV1ovBPegHPVNOKO' });
    console.log(JSON.stringify(resp1, undefined, 4));
  });
});
