import type { IProduct } from 'src/model/productDTO';

export interface ISubGroups {
  productSubGroupId: string;
  productSubGroupName: string;
  products: IProduct[];
}

export interface IGroup {
  categoryGroupId: string;
  categoryGroupName: string;
  categoryGroupImage?: string;
  subGroups: ISubGroups[];
}
