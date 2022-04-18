import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { DocumentsService } from 'src/app/services/data/documents/documents.service';
import { Document } from 'src/app/services/data/documents/document';
import { map, mapTo, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Consumable } from 'src/app/services/data/consumables/consumable.interface';
import { ConsumablesVmService } from 'src/app/services/ui/consumables-vm.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(250, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class DashboardPage implements OnInit {
  public showInstallTooltip$: Observable<boolean>;
  public showUseSafariTooltip$: Observable<boolean>;
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

  public ngOnInit(): void {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();

      return /iphone|ipad|ipod/.test(userAgent);
    };

    const isSafari = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();

      return /safari/.test(userAgent) && !/crios/.test(userAgent);
    };

    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && (window.navigator as any)?.standalone;

    // Checks if should display install popup notification:
    if (isIos() && isSafari() && !isInStandaloneMode()) {
      this.showInstallTooltip$ = timer(10000).pipe(
        mapTo(false),
        startWith(true)
      );
    } else if (isIos() && !isInStandaloneMode()) {
      this.showUseSafariTooltip$ = timer(10000).pipe(
        mapTo(false),
        startWith(true)
      );
    }
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
}
