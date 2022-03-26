import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateFormat',
})
export class LuxonDatePipe implements PipeTransform {
  transform(
    value: DateTime | Date | string,
    format: string = 'DATE_SHORT'
  ): any {
    let dateTimeToUse: DateTime;

    if (!value) {
      return '';
    }

    if (value instanceof Date) {
      dateTimeToUse = DateTime.fromJSDate(value);
    }
    if (value instanceof DateTime) {
      dateTimeToUse = value;
    } else {
      dateTimeToUse = DateTime.fromISO(value);
    }

    return dateTimeToUse.toFormat(format);
  }
}
