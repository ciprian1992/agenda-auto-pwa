import { DateTime } from 'luxon';
import { ConsumableType } from './consumable-type.enum';

export interface Consumable {
  id: string;
  beginDate: DateTime;
  expirationDate?: DateTime;
  beginDistance?: number;
  expirationDistance?: number;
  type: ConsumableType;
  description: string;
  price: number;
}
