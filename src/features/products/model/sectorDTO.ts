import type { IGroup } from './groupDTO';

export interface ISector {
  id: string;
  name: string;
  items: IGroup[];
}
