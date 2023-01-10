import { ApiRoutes } from 'src/constants/apiRoutes';
import type { IProduct } from 'src/model/productDTO';
import { convertAmountToNumber, toFloat } from 'src/util/currency';
import { request } from 'src/services/request';

export const getProduct = async (
  accessToken: string,
  event: string,
  subGroup: string,
): Promise<IProduct[]> => {
  const { data } = await request.get<IProduct[]>(
    `${ApiRoutes.event}/${event}/group/sub-group/${subGroup}/product`,
    {
      accessToken,
    },
  );

  const newData =
    data?.map(product => ({
      ...product,
      count: product.amount ?? 0,
      value: convertAmountToNumber(toFloat(product.unitValue ?? 0)),
      totalPrice: Number(product.totalValue ?? 0),
      quantity: 0,
      isHalfPrice: false,
    })) ?? [];

  return newData;
};
