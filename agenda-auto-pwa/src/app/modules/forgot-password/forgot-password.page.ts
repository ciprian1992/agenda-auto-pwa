import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public succesfulMessage = '';
  public resetError = '';

  public emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(100),
  ]);

  public formGroup = new FormGroup({
    emailControl: this.emailControl,
  });

  private subscriptions = new Subscription();

  constructor(public readonly auth: AngularFireAuth) {}

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ngOnInit() {
    this.subscriptions.add(
      this.formGroup.valueChanges.subscribe(() => {
        this.succesfulMessage = '';
        this.resetError = '';
      })
    );
  }

  public resetPassword(): void {
    if (this.formGroup.valid) {
      from(this.auth.sendPasswordResetEmail(this.emailControl.value)).subscribe(
        () => {
          this.succesfulMessage = `A fost trimis un mail de resetare catre adresa introdusa.`;
        },
        (error: { code: string; message: string }) => {
          const errorCode = error.code;

          if (errorCode === 'auth/user-not-found') {
            this.resetError = 'Nu exista un utilizator cu acest email';
          } else {
            this.resetError = 'Nu s-a putut realiza resetarea.';
          }
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
