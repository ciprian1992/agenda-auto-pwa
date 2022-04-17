import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDocumentPageRoutingModule } from './add-document-routing.module';

import { AddDocumentPage } from './add-document.page';
import { TranslocoModule } from '@ngneat/transloco';
import { DocumentTypePipe } from 'src/app/services/ui/type-token.pipe';
import { SharedModule } from 'src/app/services/ui/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDocumentPageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule,
    SharedModule,
  ],
  declarations: [AddDocumentPage],
  providers: [DocumentTypePipe],
})
export class AddDocumentPageModule {}
