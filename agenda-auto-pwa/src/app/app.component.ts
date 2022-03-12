import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Panou principal', url: '/dashboard', icon: 'home' },
    { title: 'Consumabile', url: '/consumables', icon: 'construct' },
    { title: 'Documente', url: '/documents', icon: 'document' },
  ];

  public appPages$!: Observable<AppPage[]>;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public labels = [];
  constructor(public auth: AngularFireAuth) {
    this.appPages$ = this.auth.user.pipe(
      map(
        (user) => {
          if(user) {
            return [
              { title: 'Panou principal', url: '/dashboard', icon: 'home' },
              { title: 'Consumabile', url: '/consumables', icon: 'construct' },
              { title: 'Documente', url: '/documents', icon: 'document' },
            ];
          }

          return [
            { title: 'Logare', url: '/login', icon: 'home' },
            { title: 'Creeaza cont', url: '/register', icon: 'construct' },
            { title: 'Resetare parola', url: '/forgot-password', icon: 'document' },
          ];
        }
      )
    );
  }
}


interface AppPage {
  title: string;
  url: string;
  icon: string;
}
