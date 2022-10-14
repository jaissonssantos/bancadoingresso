import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { EnvVariables } from 'src/constants/env';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const requestCreator =
  (method: Method) =>
  async <R>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> =>
    axios({ method, url: `${EnvVariables.API_URL}${url}`, ...config });

export const request = {
  get: requestCreator('GET'),
  post: requestCreator('POST'),
  put: requestCreator('PUT'),
  delete: requestCreator('DELETE'),
};
