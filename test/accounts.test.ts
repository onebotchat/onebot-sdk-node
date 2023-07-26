import { Gender } from '../src/models';
import { buildClient } from './client';

describe('accounts', () => {
  jest.setTimeout(10000);
  const client = buildClient();

  it('list accounts', async () => {
    const listAccountsResp = await client.getAccountList({ provider: 'wechat' });
    expect(listAccountsResp.data.length).toBeGreaterThan(0);
    expect(listAccountsResp.extra.total).toBeGreaterThan(0);
    console.log(JSON.stringify(listAccountsResp, undefined, 4));
  });

  it('get account', async () => {
    const account = await client.getAccount('gmtIYyV1ovBPegHPVNOKO');
    expect(account.id).toBe('gmtIYyV1ovBPegHPVNOKO');
    expect(account.nickname).not.toBe('');
    expect(account.nickname).not.toBeUndefined();
    expect(account.nickname).not.toBeNull();
    expect(account.gender).toBe(Gender.Male);
    console.log(JSON.stringify(account, undefined, 4));
  });
});
