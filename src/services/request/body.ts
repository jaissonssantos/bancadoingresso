import type { ObjectString } from 'src/types/util';

export interface PrepareBodyData {
  body: any;
  headers: ObjectString;
}

export const prepareBody = ({ body, headers }: PrepareBodyData): any => {
  if (headers['Content-Type'] === 'application/json') {
    return JSON.stringify(body);
  }

  return body;
};
