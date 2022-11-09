import type { IProduct } from './productDTO';

export interface ISector {
  id: string;
  name: string;
  items: IProduct[];
}
