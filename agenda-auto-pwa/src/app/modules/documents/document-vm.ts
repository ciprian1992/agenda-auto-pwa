import { DateTime } from 'luxon';
import { Document } from 'src/app/services/data/documents/document';
import { CarDocumentType } from 'src/app/services/data/documents/car-document-type.enum';

export class DocumentVm {
  id: string;
  beginDate: DateTime;
  expirationDate: DateTime;
  type: CarDocumentType;
  description: string;
  price: number;

  constructor(document: Document) {
    this.id = document.id;
    this.beginDate = document.beginDate;
    this.expirationDate = document.expirationDate;
    this.type = document.type;
    this.description = document.description;
    this.price = document.price;
  }

  get daysRemaining(): number {
    if (this.expirationDate.startOf('day') < DateTime.local().startOf('day')) {
      return 0;
    }

    return (
      this.expirationDate
        .startOf('day')
        .diff(DateTime.local().startOf('day'), ['days']).days + 1
    );
  }

  get totalAvailability(): number {
    return (
      this.expirationDate
        .startOf('day')
        .diff(this.beginDate.startOf('day'), ['days']).days + 1
    );
  }

  get percentagePassed(): number {
    if (this.expirationDate.startOf('day') < DateTime.local().startOf('day')) {
      return 100;
    }

    return (
      ((this.totalAvailability - this.daysRemaining) / this.totalAvailability) *
      100.0
    );
  }
}
