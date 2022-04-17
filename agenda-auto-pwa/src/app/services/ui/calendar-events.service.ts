const ics = require('ics');
import { DateTime } from 'luxon';
import { Document } from '../data/documents/document';
import { Consumable } from '../data/consumables/consumable.interface';

interface CalendarEvent {
  item: Document | Consumable;
}

import { Injectable } from '@angular/core';
import { ConsumableTypePipe, DocumentTypePipe } from './type-token.pipe';
import { TranslocoPipe } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class CalendarEventsService {
  constructor() {}

  public downloadCalendarEventFile(
    title: string,
    description: string,
    expirationDate: DateTime
  ): void {
    const expirationNextDay = expirationDate.plus({ days: 1 });

    const icsEvent = {
      start: [expirationDate.year, expirationDate.month, expirationDate.day],
      end: [
        expirationNextDay.year,
        expirationNextDay.month,
        expirationNextDay.day,
      ],
      title,
      description,
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
