import { AxiosResponse } from 'axios';

export type APIErrorResponse = {
  code: number;
  message: string;
};

export class ErrorFromResponse<T> extends Error {
  code?: number;
  response?: AxiosResponse<T>;
  status?: number;
}

export function isErrorResponse(res: AxiosResponse<unknown>): res is AxiosResponse<APIErrorResponse> {
  return !res.status || res.status < 200 || 300 <= res.status;
}
