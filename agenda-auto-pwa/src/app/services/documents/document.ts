import { DateTime } from 'luxon';

export interface Document {
  id: string;
  beginDate: DateTime;
  expirationDate: DateTime;
  type: string;
  description: string;
}
