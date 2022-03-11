import { Component } from '@angular/core';
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
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public labels = [];
  constructor() {}
}
