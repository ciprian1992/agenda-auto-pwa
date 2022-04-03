import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumablesPageRoutingModule } from './consumables-routing.module';

import { ConsumablesPage } from './consumables.page';
import { LuxonDatePipe } from 'src/app/services/ui/luxon-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumablesPageRoutingModule,
  ],
  declarations: [ConsumablesPage, LuxonDatePipe],
})
export class ConsumablesPageModule {}
