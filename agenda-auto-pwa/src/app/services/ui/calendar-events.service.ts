const ics = require('ics');
import { DateTime } from 'luxon';
import { Document } from '../data/documents/document';
import { Consumable } from '../data/consumables/consumable.interface';

interface CalendarEvent {
  item: Document | Consumable;
}

import { Injectable } from '@angular/core';
import { DocumentTypePipe } from './type-token.pipe';

@Injectable({ providedIn: 'root' })
export class CalendarEventsService {
  constructor(private readonly documentTypePipe: DocumentTypePipe) {}

  public downloadIcs(item: Document): void {
    const icsEvent = {
      start: [
        item.expirationDate.year,
        item.expirationDate.month,
        item.expirationDate.day,
        0,
      ],
      duration: { hours: 24 },
      title: `${this.documentTypePipe.transform(item.type)} expira`,
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
