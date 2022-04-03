import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsPageRoutingModule } from './documents-routing.module';

import { DocumentsPage } from './documents.page';
import { LuxonDatePipe } from 'src/app/services/ui/luxon-date.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DocumentsPageRoutingModule],
  declarations: [DocumentsPage, LuxonDatePipe],
})
export class DocumentsPageModule {}
