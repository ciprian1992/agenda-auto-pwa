import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDocumentPageRoutingModule } from './add-document-routing.module';

import { AddDocumentPage } from './add-document.page';
import { LuxonDatePipe } from 'src/app/services/ui/luxon-date.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { DocumentTypePipe } from 'src/app/services/ui/type-token.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDocumentPageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  declarations: [AddDocumentPage, LuxonDatePipe, DocumentTypePipe],
})
export class AddDocumentPageModule {}
