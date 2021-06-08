import { WINDOW_TYPE } from './window-type';

export interface CreateWindowDto {
  name: string;
  type: WINDOW_TYPE;
  serviceIds: number[];
  operatorIds: number[];
}
