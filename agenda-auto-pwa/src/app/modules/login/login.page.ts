import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public signInError = '';

  public emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(100),
  ]);

  public passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  public formGroup = new FormGroup({
    emailControl: this.emailControl,
    passwordControl: this.passwordControl,
  });

  constructor(
    public readonly auth: AngularFireAuth,
    public readonly router: Router
  ) {}

  public signIn() {
    if (this.formGroup.valid) {
      from(
        this.auth.signInWithEmailAndPassword(
          this.emailControl.value,
          this.passwordControl.value
        )
      ).subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        (error: { code: string; message: string }) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/wrong-password') {
            this.signInError = 'Email sau parola incorecta';
          } else if (errorCode === 'auth/user-not-found') {
            this.signInError = 'Nu exista un utilizator cu acest email';
          } else {
            this.signInError = 'Nu s-a putut realiza logarea.';
          }
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  ngOnInit() {}
}
