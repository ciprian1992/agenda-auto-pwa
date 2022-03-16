import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { setupTestingRouter } from '@angular/router/testing';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages$!: Observable<AppPage[]>;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public labels = [];
  constructor(
    public readonly auth: AngularFireAuth,
    public readonly router: Router
  ) {
    this.appPages$ = this.auth.user.pipe(
      map((user) => {
        if (user) {
          return [
            { title: 'Panou principal', url: '/dashboard', icon: 'home' },
            { title: 'Consumabile', url: '/consumables', icon: 'construct' },
            { title: 'Documente', url: '/documents', icon: 'document' },
            {
              title: 'Delogare',
              action: this.logout.bind(this),
              icon: 'log-out',
            },
          ];
        }

        return [
          { title: 'Logare', url: '/login', icon: 'log-in' },
          { title: 'Creeaza cont', url: '/register', icon: 'person-add' },
          {
            title: 'Resetare parola',
            url: '/forgot-password',
            icon: 'refresh',
          },
        ];
      })
    );
  }

  public logout(): void {
    from(this.auth.signOut()).subscribe(() => this.router.navigate(['/login']));
  }
}

interface AppPage {
  title: string;
  icon: string;
  action?: Function;
  url?: string;
}
