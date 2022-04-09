import { DateTime } from 'luxon';
import { ConsumableType } from 'src/app/services/data/consumables/consumable-type.enum';
import { Consumable } from 'src/app/services/data/consumables/consumable.interface';

const AVERAGE_KM_PER_DAY = 8000 / 365;

export class ConsumableVm {
  id: string;
  beginDate: DateTime;
  expirationDate: DateTime;
  beginDistance?: number;
  expirationDistance?: number;
  type: ConsumableType;
  description: string;
  price: number;

  constructor(consumable: Consumable) {
    this.id = consumable.id;
    this.beginDate = consumable.beginDate;
    this.beginDistance = consumable.beginDistance;
    this.expirationDistance = consumable.expirationDistance;

    if (consumable.expirationDate) {
      this.expirationDate = consumable.expirationDate;
    } else {
      const valability =
        (this.expirationDistance - this.beginDistance) / AVERAGE_KM_PER_DAY;

      this.expirationDate = this.beginDate.plus({ days: valability });
    }
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
