import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { Document } from 'src/app/services/documents/document';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';
import { Consumable } from 'src/app/services/consumables/consumable.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  consumables$: Observable<Consumable[]>;
  documents$: Observable<Document[]>;

  constructor(
    readonly consumablesService: ConsumablesService,
    readonly documentsService: DocumentsService,
    readonly router: Router
  ) {
    this.consumables$ = this.consumablesService.consumables$.pipe(
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

  ngOnInit() {}
}
