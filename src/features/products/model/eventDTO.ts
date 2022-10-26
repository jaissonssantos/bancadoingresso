import type { ISector } from './sectorDTO';

export interface ISection {
  date: string;
  items: ISector[];
}

export interface IEvent {
  id: string;
  name: string;
  image: string;
  date?: string;
  section: ISection[];
}
