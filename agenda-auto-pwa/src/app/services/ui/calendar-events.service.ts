const ics = require('ics');
import { DateTime } from 'luxon';
import { Document } from '../data/documents/document';
import { Consumable } from '../data/consumables/consumable.interface';

interface CalendarEvent {
  item: Document | Consumable;
}

import { Injectable } from '@angular/core';
import { DocumentTypePipe } from './type-token.pipe';
import { TranslocoPipe } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class CalendarEventsService {
  constructor(
    private readonly documentTypePipe: DocumentTypePipe,
    private readonly translocoPipe: TranslocoPipe
  ) {}

  public downloadIcs(item: Document): void {
    const dateEnd = item.expirationDate.plus({ days: 1 });
    const translatedType = this.translocoPipe.transform(
      this.documentTypePipe.transform(item.type)
    );

    const icsEvent = {
      start: [
        item.expirationDate.year,
        item.expirationDate.month,
        item.expirationDate.day,
      ],
      end: [dateEnd.year, dateEnd.month, dateEnd.day],
      duration: { hours: 24 },
      title: `${translatedType} expira`,
      url: 'https://thankful-plant-074674403.1.azurestaticapps.net/login',
      status: 'CONFIRMED',
    };

    ics.createEvent(icsEvent, (error, value) => {
      if (error) {
        return;
      }

      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_self');
    });
  }
}
