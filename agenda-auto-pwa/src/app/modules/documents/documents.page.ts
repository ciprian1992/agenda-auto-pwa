import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { DocumentVm } from './document-vm';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsPage implements OnDestroy {
  public documents$: Observable<DocumentVm[]>;
  private deleteDocumentSubject = new Subject<string>();
  private subscriptiosn = new Subscription();

  constructor(
    public readonly auth: AngularFireAuth,
    private readonly documentsService: DocumentsService,
    private readonly router: Router
  ) {
    this.documents$ = this.documentsService.documents$.pipe(
      map((documents) => documents.map((document) => new DocumentVm(document)))
    );

    this.subscriptiosn.add(
      this.deleteDocumentSubject
        .pipe(
          withLatestFrom(this.auth.user),
          mergeMap(([documentId, { uid }]) =>
            this.documentsService.deleteDocument(uid, documentId)
          ),
          tap(() => this.documentsService.fetchDocuments())
        )
        .subscribe()
    );
  }

  public navigateToAddDocument(): void {
    this.router.navigate(['add-document']);
  }

  public deleteDocument(id: string): void {
    this.deleteDocumentSubject.next(id);
  }

  public ngOnDestroy(): void {
    this.subscriptiosn.unsubscribe();
  }
}
