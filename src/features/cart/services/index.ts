import { ApiRoutes } from 'src/constants/apiRoutes';
import type { Order as OrderBody } from 'src/features/cart/types';
import { request } from 'src/services/request';

export const saveOrder = async (
  accessToken: string,
  body: OrderBody,
): Promise<string> => {
  const { data } = await request.post<string>(`${ApiRoutes.event}/order`, {
    accessToken,
    body,
  });

  return data;
};
