import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { from, Subscription } from 'rxjs';

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

  constructor(public auth: AngularFireAuth, private readonly router: Router) {}

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
        () => {
          this.router.navigate(['/login']);
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
