import axios from 'axios';

export type TokenProviderOptions = {
  audience: string;
  domain: string;
  scopes: string[];
};

type TokenResult = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

/**
 *  Token Provider.
 */
export class TokenProvider {
  private clientId: string;
  private clientSecret: string;
  private options: TokenProviderOptions;
  private accessToken: string;
  private expiresAt: number;

  constructor(clientId: string, clientSecret: string, options?: TokenProviderOptions) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.options = options ?? {
      domain: 'https://onebot.cn.authok.cn/oauth/token',
      audience: 'https://api.onebot.chat/admin/v1',
      scopes: [],
    };
    this.accessToken = '';
    this.expiresAt = 0;
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessToken || this.expiresAt <= new Date().getTime()) {
      await this.load();
    }
    return this.accessToken;
  }

  async load() {
    const { data } = await axios.post<TokenResult>(
      this.options.domain,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: this.options.audience,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    this.accessToken = data.access_token;
    // if the expires_in is lower or equal to than 10 seconds, do not subtract 10 additional seconds.
    if (data.expires_in && data.expires_in <= 10 /* seconds */) {
      this.expiresAt = new Date().getTime() + data.expires_in * 1000;
    } else if (data.expires_in) {
      // Subtract 10 seconds from expires_in to fetch a new one, before it expires.
      this.expiresAt = new Date().getTime() + (data.expires_in * 1000 - 10000); /* milliseconds */
    } else {
      this.expiresAt = new Date().getTime() + 60 * 60 * 1000; //1h
    }
  }
}
