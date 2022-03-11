import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DocumentsService {
  constructor() {}

  public getDocuments(): Observable<Document[]> {
    return of([]);
  }

}
