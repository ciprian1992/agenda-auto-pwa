import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddConsumablePageRoutingModule } from './add-consumable-routing.module';

import { AddConsumablePage } from './add-consumable.page';
import { LuxonDatePipe } from 'src/app/services/ui/luxon-date.pipe';
import { ConsumableType } from 'src/app/services/data/consumables/consumable-type.enum';
import { ConsumableTypePipe } from 'src/app/services/ui/type-token.pipe';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddConsumablePageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  declarations: [AddConsumablePage, LuxonDatePipe, ConsumableTypePipe],
})
export class AddConsumablePageModule {}
