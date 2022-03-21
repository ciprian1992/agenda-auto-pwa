import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { mergeMap, tap } from 'rxjs/operators';
import { DocumentsService } from 'src/app/services/documents/documents.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    readonly documentsService: DocumentsService
  ) {}

  ngOnInit() {
    this.auth.user
      .pipe(
        mergeMap((user) => this.documentsService.getDocuments(user.uid)),
        tap(console.log)
      )
      .subscribe();
  }
}
