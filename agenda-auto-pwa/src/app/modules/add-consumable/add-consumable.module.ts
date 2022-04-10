import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddConsumablePageRoutingModule } from './add-consumable-routing.module';

import { AddConsumablePage } from './add-consumable.page';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/services/ui/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddConsumablePageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule,
    SharedModule,
  ],
  declarations: [AddConsumablePage],
})
export class AddConsumablePageModule {}
