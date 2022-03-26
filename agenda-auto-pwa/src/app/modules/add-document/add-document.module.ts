import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDocumentPageRoutingModule } from './add-document-routing.module';

import { AddDocumentPage } from './add-document.page';
import { LuxonDatePipe } from 'src/app/services/luxon-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDocumentPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddDocumentPage, LuxonDatePipe],
})
export class AddDocumentPageModule {}
