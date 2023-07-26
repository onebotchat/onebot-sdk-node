import OneBotClient, { LogLevel } from '../src/index';

const buildClient = (): OneBotClient => {
  const client = new OneBotClient(process.env.ONEBOT_CLIENT_ID as string, process.env.ONEBOT_CLIENT_SECRET as string, {
    baseUrl: process.env.ONEBOT_BASE_URL,
    logLevel: LogLevel.WARN,
  });
  return client;
};

export { buildClient };
