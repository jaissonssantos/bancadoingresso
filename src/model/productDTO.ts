import type { ITickets } from 'src/model/eventDTO';

export interface IProduct extends ITickets {
  id: string;
  name: string;
  // property related to the product
  amount?: number;
  unitValue?: number;
  totalValue?: number;
  imageBase64?: string;
}
