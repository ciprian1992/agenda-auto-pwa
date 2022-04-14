import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/services/data/documents/documents.service';
import { Document } from 'src/app/services/data/documents/document';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Consumable } from 'src/app/services/data/consumables/consumable.interface';
import { ConsumablesVmService } from 'src/app/services/ui/consumables-vm.service';
import { DateTime } from 'luxon';

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
    const url = encodeURI(
      'data:text/calendar;charset=utf8,' +
        [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'URL:' + document.URL,
          'DTSTART:' + DateTime.now().toMillis(),
          'DTEND:' + DateTime.now().toMillis(),
          'SUMMARY:' + 'Summary',
          'DESCRIPTION:' + '',
          'LOCATION:' + '',
          'END:VEVENT',
          'END:VCALENDAR',
        ].join('\n')
    );
    let isIE = false;
    if (navigator.userAgent.indexOf('MSIE') !== -1) {
      //IF IE > 10
      isIE = true;
    }
    if (isIE) {
      const nav = window.navigator as any;
      const blob = new Blob([url], { type: 'text/calendar' });
      nav.msSaveOrOpenBlob(blob, 'download.ics');
    } else {
      window.open(url, '_blank');
    }
  }

  ngOnInit() {}
}
