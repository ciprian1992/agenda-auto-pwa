import { DateTime } from 'luxon';

export interface Document {
  beginDate: DateTime;
  endDate: string;
  type: string;
  description: string;
}
