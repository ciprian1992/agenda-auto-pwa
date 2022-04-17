import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/services/data/documents/documents.service';
import { Document } from 'src/app/services/data/documents/document';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Consumable } from 'src/app/services/data/consumables/consumable.interface';
import { ConsumablesVmService } from 'src/app/services/ui/consumables-vm.service';
import { DateTime } from 'luxon';
const ics = require('ics');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  consumables$: Observable<Consumable[]>;
  documents$: Observable<Document[]>;

  constructor(
    readonly consumablesService: ConsumablesVmService,
    readonly documentsService: DocumentsService,
    readonly router: Router
  ) {
    this.consumables$ = this.consumablesService.consumablesVm$.pipe(
      map((consumables) => consumables.slice(0, 6))
    );

    this.documents$ = this.documentsService.documents$.pipe(
      map((documents) => documents.slice(0, 6))
    );
  }

  public navigateToConsumables() {
    this.router.navigate(['consumables']);
  }

  public navigateToAddConsumable() {
    this.router.navigate(['add-consumable']);
  }

  public navigateToDocuments() {
    this.router.navigate(['documents']);
  }

  public navigateToAddDocument() {
    this.router.navigate(['add-document']);
  }

  public getIcs(): void {
    const event = {
      start: [2018, 5, 30, 6, 30],
      duration: { hours: 6, minutes: 30 },
      title: 'Bolder Boulder',
      description: 'Annual 10-kilometer run in Boulder, Colorado',
      location: 'Folsom Field, University of Colorado (finish line)',
      url: 'http://www.bolderboulder.com/',
      geo: { lat: 40.0095, lon: 105.2669 },
      categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
      attendees: [
        {
          name: 'Adam Gibbons',
          email: 'adam@example.com',
          rsvp: true,
          partstat: 'ACCEPTED',
          role: 'REQ-PARTICIPANT',
        },
        {
          name: 'Brittany Seaton',
          email: 'brittany@example2.org',
          dir: 'https://linkedin.com/in/brittanyseaton',
          role: 'OPT-PARTICIPANT',
        },
      ],
    };

    ics.createEvent(event, (error, value) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log(value);

      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_self');
    });
  }

  ngOnInit() {}
}
