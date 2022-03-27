import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { Document } from 'src/app/services/documents/document';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage {
  documents$: Observable<Document[]>;

  constructor(private readonly documentsService: DocumentsService) {
    this.documents$ = this.documentsService.documents$;
  }
}
