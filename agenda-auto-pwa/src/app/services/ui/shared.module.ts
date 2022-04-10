import { NgModule } from '@angular/core';
import { LuxonDatePipe } from './luxon-date.pipe';
import { ConsumableTypePipe, DocumentTypePipe } from './type-token.pipe';

@NgModule({
  exports: [LuxonDatePipe, DocumentTypePipe, ConsumableTypePipe],
  declarations: [LuxonDatePipe, DocumentTypePipe, ConsumableTypePipe],
})
export class SharedModule {}
