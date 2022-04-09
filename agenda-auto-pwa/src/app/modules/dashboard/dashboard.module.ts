import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { LuxonDatePipe } from '../../services/ui/luxon-date.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import {
  ConsumableTypePipe,
  DocumentTypePipe,
} from 'src/app/services/ui/type-token.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    TranslocoModule,
  ],
  declarations: [
    DashboardPage,
    LuxonDatePipe,
    DocumentTypePipe,
    ConsumableTypePipe,
  ],
})
export class DashboardPageModule {}
