import type { ObjectString } from 'src/types/util';

export interface ConstructDefaultHeadersData {
  accessToken?: string;
  body?: any;
}

export const constructDefaultHeaders = ({
  accessToken,
  body,
}: ConstructDefaultHeadersData): ObjectString => {
  const headers: ObjectString = {
    Accept: 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (body) {
    headers['Content-Type'] =
      body instanceof FormData ? 'multipart/form-data' : 'application/json';
  }

  return headers;
};
