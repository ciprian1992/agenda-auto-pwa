import { DateTime } from 'luxon';
import { CarDocumentType } from './car-document-type.enum';

export interface Document {
  id: string;
  beginDate: DateTime;
  expirationDate: DateTime;
  type: CarDocumentType;
  description: string;
  price: number;
}
