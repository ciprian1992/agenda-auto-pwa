import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Subscription } from 'rxjs';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  public registrationError = '';

  public emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(100),
  ]);
  public passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  public passwordConfirmControl = new FormControl('', Validators.required);

  public formGroup = new FormGroup({
    emailControl: this.emailControl,
    passwordControl: this.passwordControl,
    passwordConfirmControl: this.passwordConfirmControl,
  });

  private subscriptions = new Subscription();

  constructor(
    public auth: AngularFireAuth,
    private readonly router: Router,
    private afs: AngularFirestore
  ) {}

  public ngOnInit() {
    this.passwordConfirmControl.setValidators([
      Validators.required,
      this.checkPasswords.bind(this),
    ]);

    this.subscriptions.add(
      this.formGroup.valueChanges.subscribe(() => (this.registrationError = ''))
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public register() {
    if (this.formGroup.valid) {
      from(
        this.auth.createUserWithEmailAndPassword(
          this.emailControl.value,
          this.passwordControl.value
        )
      ).subscribe(
        (userCredential) => {
          const userUid = userCredential.user.uid; // The UID of the user.
          const email = userCredential.user.email; // The email of the user.
          const displayName = userCredential.user.displayName; // The display name of the user.

          const account = {
            useruid: userUid,
            email,
            displayName,
            creationDate: DateTime.now().toString(),
            creationTimeStamp: DateTime.now().toMillis(),
          };

          this.afs.collection('users').doc(userUid).set(account);

          this.router.navigate(['/dashboard']);
        },
        (error: { code: string; message: string }) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/email-already-in-use') {
            this.registrationError = 'Email-ul este deja folosit';
          } else if (errorCode === 'auth/weak-password') {
            this.registrationError = 'Parola este prea slaba';
          } else {
            this.registrationError = 'Utilizatorul nu a putut fi creat.';
          }
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private checkPasswords(): ValidationErrors | null {
    const pass = this.passwordControl.value;
    const confirmPass = this.passwordConfirmControl.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
