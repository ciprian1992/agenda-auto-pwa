import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddConsumablePageRoutingModule } from './add-consumable-routing.module';

import { AddConsumablePage } from './add-consumable.page';
import { LuxonDatePipe } from 'src/app/services/ui/luxon-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddConsumablePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddConsumablePage, LuxonDatePipe],
})
export class AddConsumablePageModule {}
