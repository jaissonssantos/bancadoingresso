import type { ITickets } from 'src/model/eventDTO';

export interface IProduct extends ITickets {
  id: string;
  name: string;
  image?: string;
}
