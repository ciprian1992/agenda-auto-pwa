import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsPageRoutingModule } from './documents-routing.module';

import { DocumentsPage } from './documents.page';
import { LuxonDatePipe } from 'src/app/services/ui/luxon-date.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/services/ui/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentsPageRoutingModule,
    TranslocoModule,
    SharedModule,
  ],
  declarations: [DocumentsPage],
})
export class DocumentsPageModule {}
