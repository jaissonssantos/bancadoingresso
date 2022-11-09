import type { ISubGroup } from './subgroupDTO';

export interface IGroup {
  id: string;
  name: string;
  image?: string;
  items: ISubGroup[];
}
