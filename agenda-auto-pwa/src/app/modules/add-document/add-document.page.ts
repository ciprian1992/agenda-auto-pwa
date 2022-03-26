import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {
  public descriptionControl = new FormControl('', [Validators.required]);
  public documentTypeControl = new FormControl('', [Validators.required]);
  public priceControl = new FormControl('', [Validators.required]);
  public dateBeginControl = new FormControl(DateTime.local(), [
    Validators.required,
  ]);
  public dateExpirationControl = new FormControl(DateTime.local(), [
    Validators.required,
  ]);

  public formGroup = new FormGroup({
    description: this.descriptionControl,
    documentType: this.documentTypeControl,
    price: this.priceControl,
    dateBegin: this.dateBeginControl,
    dateExpiration: this.dateExpirationControl,
  });

  constructor() {}

  ngOnInit() {}

  public show() {}
}
