import { Injectable } from '@angular/core';
import { combineLatest, from, Observable, of, ReplaySubject } from 'rxjs';
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

  public addDocument(userId: string, document: Document): Observable<void> {
    const id = this.afs.createId();

    return from(
      this.afs
        .collection('users')
        .doc(userId)
        .collection<DocumentDto>(this.collection)
        .doc(id)
        .set(this.mapToDocumentDto({ ...document, id }))
    );
  }

  public updateDocument(userId: string, document: Document): Observable<void> {
    return from(
      this.afs
        .collection('users')
        .doc(userId)
        .collection<DocumentDto>(this.collection)
        .doc(document.id)
        .set(this.mapToDocumentDto({ ...document }))
    );
  }

  public deleteDocument(userId: string, documentId: string): Observable<void> {
    return from(
      this.afs
        .collection('users')
        .doc(userId)
        .collection<DocumentDto>(this.collection)
        .doc(documentId)
        .delete()
    );
  }

  private mapToDocument(documentDto: DocumentDto): Document {
    return {
      id: documentDto._id,
      beginDate: DateTime.fromMillis(documentDto.beginTimestamp),
      expirationDate: DateTime.fromMillis(documentDto.expirationTimestamp),
      type: CarDocumentType[documentDto.type],
      description: documentDto.description,
      price: documentDto.price,
    };
  }

  private mapToDocumentDto(document: Document): DocumentDto {
    return {
      _id: document.id,
      _creationTimestamp: DateTime.local().toMillis(),
      beginTimestamp: document.beginDate.toMillis(),
      expirationTimestamp: document.expirationDate.toMillis(),
      type: document.type,
      description: document.description,
      price: document.price,
    };
  }
}
