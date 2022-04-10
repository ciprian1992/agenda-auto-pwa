import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/services/ui/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    TranslocoModule,
    SharedModule,
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
