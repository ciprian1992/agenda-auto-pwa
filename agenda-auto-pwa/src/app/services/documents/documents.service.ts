import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentDto } from './document.dto';
import { Document } from './document';
import { DateTime } from 'luxon';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private collection;

  constructor(private afs: AngularFirestore) {}

  public getDocuments(userId: string): Observable<Document[]> {
    //this.afs.createId();
    //this.afs.collection(this.collection).doc(this.afs.createId())

    return this.afs
      .collection<DocumentDto>('documents', (ref) =>
        ref.where('userId', '==', userId)
      )
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
      type: documentDto.type,
      description: documentDto.description,
    };
  }
}
