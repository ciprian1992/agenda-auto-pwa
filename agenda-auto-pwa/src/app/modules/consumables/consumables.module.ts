import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumablesPageRoutingModule } from './consumables-routing.module';

import { ConsumablesPage } from './consumables.page';
import { LuxonDatePipe } from 'src/app/services/ui/luxon-date.pipe';
import { ConsumableTypePipe } from 'src/app/services/ui/type-token.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/services/ui/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumablesPageRoutingModule,
    TranslocoModule,
    SharedModule,
  ],
  declarations: [ConsumablesPage],
})
export class ConsumablesPageModule {}
