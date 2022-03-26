import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { DocumentDto } from './document.dto';
import { Document } from './document';
import { DateTime } from 'luxon';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  filter,
  map,
  mergeMap,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CarDocumentType } from './car-document-type.enum';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private collection = 'documents';
  private fetchDataSubject = new ReplaySubject(1);

  public documents$: Observable<Document[]>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.documents$ = combineLatest([
      this.fetchDataSubject,
      this.auth.user,
    ]).pipe(
      filter(([_, user]) => !!user),
      mergeMap(([_, user]) => this.getDocuments(user.uid)),
      shareReplay()
    );

    this.fetchDocuments();
  }

  public fetchDocuments() {
    this.fetchDataSubject.next();
  }

  public getDocuments(userId: string): Observable<Document[]> {
    return of([
      {
        id: '1',
        beginDate: DateTime.local(),
        expirationDate: DateTime.local(),
        type: CarDocumentType.INSURANCE,
        description: '',
        price: 100,
      },
      {
        id: '1',
        beginDate: DateTime.local(),
        expirationDate: DateTime.local().plus({ days: 1 }),
        type: CarDocumentType.INSURANCE,
        description: '',
        price: 100,
      },
      {
        id: '1',
        beginDate: DateTime.local(),
        expirationDate: DateTime.local().plus({ days: 2 }),
        type: CarDocumentType.INSURANCE,
        description: '',
        price: 100,
      },
      {
        id: '1',
        beginDate: DateTime.local(),
        expirationDate: DateTime.local().plus({ days: 3 }),
        type: CarDocumentType.INSURANCE,
        description: '',
        price: 100,
      },
      {
        id: '1',
        beginDate: DateTime.local(),
        expirationDate: DateTime.local().plus({ days: 4 }),
        type: CarDocumentType.INSURANCE,
        description: '',
        price: 100,
      },
      {
        id: '1',
        beginDate: DateTime.local(),
        expirationDate: DateTime.local().plus({ days: 5 }),
        type: CarDocumentType.INSURANCE,
        description: '',
        price: 100,
      },
      {
        id: '1',
        beginDate: DateTime.local(),
        expirationDate: DateTime.local().plus({ days: 6 }),
        type: CarDocumentType.INSURANCE,
        description: '',
        price: 100,
      },
    ]);

    return this.afs
      .collection('users')
      .doc(userId)
      .collection<DocumentDto>(this.collection)
      .valueChanges()
      .pipe(
        map((documents) =>
          documents.map((document) => this.mapToDocument(document))
        )
      );
  }

  private mapToDocument(documentDto: DocumentDto): Document {
    return {
      //id: documentDto._id,
      id: '',
      beginDate: DateTime.fromMillis(documentDto.beginTimestamp),
      expirationDate: DateTime.fromMillis(documentDto.expirationTimestamp),
      type: CarDocumentType[documentDto.type],
      description: documentDto.description,
      price: documentDto.price,
    };
  }
}
