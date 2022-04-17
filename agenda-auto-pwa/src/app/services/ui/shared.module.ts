import { NgModule } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { CalendarEventsService } from './calendar-events.service';
import { LuxonDatePipe } from './luxon-date.pipe';
import { ConsumableTypePipe, DocumentTypePipe } from './type-token.pipe';

@NgModule({
  exports: [LuxonDatePipe, DocumentTypePipe, ConsumableTypePipe],
  declarations: [LuxonDatePipe, DocumentTypePipe, ConsumableTypePipe],
  providers: [
    CalendarEventsService,
    TranslocoPipe,
    DocumentTypePipe,
    ConsumableTypePipe,
  ],
})
export class SharedModule {}
