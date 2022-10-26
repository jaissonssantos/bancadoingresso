import type { IProduct } from 'src/model/productDTO';

export interface ISubGroup {
  id: string;
  name: string;
  items: IProduct[];
}
