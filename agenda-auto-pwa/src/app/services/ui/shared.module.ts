import { NgModule } from '@angular/core';
import { TranslocoModule, TranslocoPipe } from '@ngneat/transloco';
import { CalendarEventsService } from './calendar-events.service';
import { LuxonDatePipe } from './luxon-date.pipe';
import { ConsumableTypePipe, DocumentTypePipe } from './type-token.pipe';

@NgModule({
  exports: [LuxonDatePipe, DocumentTypePipe, ConsumableTypePipe],
  declarations: [LuxonDatePipe, DocumentTypePipe, ConsumableTypePipe],
  providers: [CalendarEventsService, TranslocoPipe],
})
export class SharedModule {}
