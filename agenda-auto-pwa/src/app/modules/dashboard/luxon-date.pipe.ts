import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateFormat',
})
export class LuxonDatePipe implements PipeTransform {
  transform(value: DateTime | Date, format: string = 'DATE_SHORT'): any {
    let dateTimeToUse: DateTime;
    if (value instanceof Date) {
      dateTimeToUse = DateTime.fromJSDate(value);
    } else {
      dateTimeToUse = value;
    }

    return dateTimeToUse.toFormat(format);
  }
}
