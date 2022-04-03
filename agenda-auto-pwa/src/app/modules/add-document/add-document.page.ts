import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { CarDocumentType } from 'src/app/services/data/documents/car-document-type.enum';
import { Document } from 'src/app/services/data/documents/document';
import { DocumentsService } from 'src/app/services/data/documents/documents.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {
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
    private readonly router: Router
  ) {
    this.subscriptions.add(
      this.addDocumentSubject
        .pipe(
          withLatestFrom(this.auth.user),
          mergeMap(([_, { uid }]) => {
            this.formGroup.markAllAsTouched();
            this.formGroup.updateValueAndValidity();
            if (this.formGroup.valid) {
              return this.documentsService.addDocument(
                uid,
                this.extractDocumentFromForm()
              );
            }

            return EMPTY;
          })
        )
        .subscribe(() => {
          this.documentsService.fetchDocuments();
          this.router.navigate(['dashboard']);
        })
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

  private checkDates(): ValidationErrors | null {
    const beginDate = DateTime.fromISO(this.dateBeginControl.value);
    const expirationDate = DateTime.fromISO(this.dateExpirationControl.value);

    return beginDate <= expirationDate ? null : { datesWrong: true };
  }

  public addDocument(): void {
    this.addDocumentSubject.next();
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

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
