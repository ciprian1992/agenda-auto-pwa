import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { Document } from 'src/app/services/documents/document';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  documents$: Observable<Document[]>;

  constructor(
    readonly documentsService: DocumentsService,
    readonly router: Router
  ) {
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

  public navigateToDocuments() {
    this.router.navigate(['documents']);
  }

  public navigateToAddDocument() {
    this.router.navigate(['add-document']);
  }

  ngOnInit() {}
}
