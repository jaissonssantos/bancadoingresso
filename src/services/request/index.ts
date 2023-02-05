import { Env } from 'src/constants/env';
import type { ObjectString } from 'src/types/util';
import { log } from 'src/util/log';
import { persistAuthState } from 'src/features/auth';
import { ApiError } from './ApiError';
import { prepareBody } from './body';
import { constructDefaultHeaders } from './headers';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  accessToken?: string;
  headers?: ObjectString;
  body?: any;
}

interface RequestReturn<T> {
  data: T;
}

type RequestCreator = <R>(
  endpoint: string,
  options?: RequestOptions,
) => Promise<RequestReturn<R>>;

const requestCreator =
  (method: Method): RequestCreator =>
  async (endpoint, { accessToken, body, headers } = {}) => {
    const finalHeaders: ObjectString = {
      ...constructDefaultHeaders({ accessToken, body }),
      ...headers,
    };

    const finalBody = prepareBody({ body, headers: finalHeaders });

    log.d(`${method} ${endpoint} ${body ? JSON.stringify(body) : ''}`);

    const response = await fetch(`${Env.API_URL}${endpoint}`, {
      method,
      headers: finalHeaders,
      body: finalBody,
    });

    const dataText = await response.text();
    const data = dataText && JSON.parse(dataText);

    log.d(`${method} ${endpoint} (${response.status}) ${dataText}`);

    if (response.status === 401) {
      await persistAuthState({
        token: undefined,
        refresh_token: undefined,
        user: undefined,
      });
    }

    if (!response.ok) {
      throw new ApiError(data);
    }

    return { data };
  };

export const request = {
  get: requestCreator('GET'),
  post: requestCreator('POST'),
  put: requestCreator('PUT'),
  delete: requestCreator('DELETE'),
};
