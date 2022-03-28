import { DateTime } from 'luxon';
import { ConsumableType } from 'src/app/services/consumables/consumable-type.enum';
import { Consumable } from 'src/app/services/consumables/consumable.interface';

export class ConsumableVm {
  id: string;
  beginDate: DateTime;
  expirationDate: DateTime;
  type: ConsumableType;
  description: string;
  price: number;

  constructor(consumable: Consumable) {
    this.id = consumable.id;
    this.beginDate = consumable.beginDate;
    this.expirationDate = consumable.expirationDate;
    this.type = consumable.type;
    this.description = consumable.description;
    this.price = consumable.price;
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
