import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DateTime } from 'luxon';
import { EMPTY, from, Observable, Subject, Subscription } from 'rxjs';
import { mapTo, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { CarDocumentType } from 'src/app/services/data/documents/car-document-type.enum';
import { Document } from 'src/app/services/data/documents/document';
import { DocumentsService } from 'src/app/services/data/documents/documents.service';
import { CalendarEventsService } from 'src/app/services/ui/calendar-events.service';
import { DocumentTypePipe } from 'src/app/services/ui/type-token.pipe';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit, OnDestroy {
  public descriptionControl = new FormControl('');
  public documentTypeControl = new FormControl('', [Validators.required]);
  public priceControl = new FormControl('');
  public dateBeginControl = new FormControl(DateTime.local(), [
    Validators.required,
  ]);
  public dateExpirationControl = new FormControl(DateTime.local(), [
    Validators.required,
  ]);
  public documentTypes = Object.keys(CarDocumentType);

  public formGroup = new FormGroup({
    description: this.descriptionControl,
    documentType: this.documentTypeControl,
    price: this.priceControl,
    dateBegin: this.dateBeginControl,
    dateExpiration: this.dateExpirationControl,
  });

  private addDocumentSubject = new Subject();
  private subscriptions = new Subscription();

  constructor(
    private readonly documentsService: DocumentsService,
    public readonly auth: AngularFireAuth,
    private readonly router: Router,
    public readonly alertController: AlertController,
    public readonly documentTypePipe: DocumentTypePipe,
    public readonly calendarEventsService: CalendarEventsService
  ) {
    this.subscriptions.add(
      this.addDocumentSubject
        .pipe(
          withLatestFrom(this.auth.user),
          mergeMap(([_, { uid }]) => {
            this.formGroup.markAllAsTouched();
            this.formGroup.updateValueAndValidity();
            if (this.formGroup.valid) {
              const document: Document = this.extractDocumentFromForm();

              return this.documentsService
                .addDocument(uid, this.extractDocumentFromForm())
                .pipe(mapTo(document));
            }

            return EMPTY;
          }),
          mergeMap((document) => this.showAddEventDialog(document))
        )
        .subscribe(() => {
          this.documentsService.fetchDocuments();

          this.router.navigate(['dashboard']);
        })
    );
  }

  public showAddEventDialog(document: Document): Observable<any> {
    const alertPromise = from(
      this.alertController.create({
        header: 'Creeaza eveniment in calendar',
        message:
          'Doriti sa creati un eveniment in calendar pentru a va aduce aminte atunci cand expira?',
        buttons: [
          {
            text: 'Nu',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
          },
          {
            text: 'Da',
            id: 'confirm-button',
            handler: () => {
              this.calendarEventsService.downloadIcs(document);
            },
          },
        ],
      })
    );

    return from(alertPromise).pipe(
      tap((alert) => alert.present()),
      mergeMap((alert) => alert.onDidDismiss())
    );
  }

  public ngOnInit() {
    this.dateBeginControl.setValidators([
      Validators.required,
      this.checkDates.bind(this),
    ]);

    this.dateExpirationControl.setValidators([
      Validators.required,
      this.checkDates.bind(this),
    ]);
  }

  public addDocument(): void {
    this.addDocumentSubject.next();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private checkDates(): ValidationErrors | null {
    const beginDate = DateTime.fromISO(this.dateBeginControl.value);
    const expirationDate = DateTime.fromISO(this.dateExpirationControl.value);

    return beginDate <= expirationDate ? null : { datesWrong: true };
  }

  private extractDocumentFromForm(): Document {
    return {
      id: '',
      beginDate: DateTime.fromISO(this.dateBeginControl.value),
      expirationDate: DateTime.fromISO(this.dateExpirationControl.value),
      type: this.documentTypeControl.value,
      description: this.descriptionControl.value,
      price: this.priceControl.value,
    };
  }
}
