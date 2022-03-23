import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { Document } from 'src/app/services/documents/document';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  documents$: Observable<Document[]>;

  constructor(readonly documentsService: DocumentsService) {
    this.documents$ = this.documentsService.documents$.pipe(
      map((documents) =>
        documents
          .sort(
            (documentA, documentB) =>
              documentA.expirationDate.toMillis() -
              documentB.expirationDate.toMillis()
          )
          .slice(0, 6)
      )
    );
  }

  ngOnInit() {}
}
