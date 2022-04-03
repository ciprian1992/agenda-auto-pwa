import { Injectable } from '@angular/core';
import { combineLatest, from, Observable, ReplaySubject } from 'rxjs';
import { DateTime } from 'luxon';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, map, mergeMap, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Consumable } from './consumable.interface';
import { ConsumableType } from './consumable-type.enum';
import { ConsumableDto } from './consumable-dto.interface';

@Injectable({ providedIn: 'root' })
export class ConsumablesService {
  private collection = 'consumables';
  private fetchDataSubject = new ReplaySubject(1);

  public consumables$: Observable<Consumable[]>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.consumables$ = combineLatest([
      this.fetchDataSubject,
      this.auth.user,
    ]).pipe(
      filter(([_, user]) => !!user),
      mergeMap(([_, user]) => this.getConsumables(user.uid)),
      shareReplay()
    );

    this.fetchConsumables();
  }

  public fetchConsumables() {
    this.fetchDataSubject.next();
  }

  public getConsumables(userId: string): Observable<Consumable[]> {
    return this.afs
      .collection('users')
      .doc(userId)
      .collection<ConsumableDto>(this.collection, (ref) =>
        ref.orderBy('expirationDistance', 'desc')
      )
      .valueChanges()
      .pipe(
        map((consumables) =>
          consumables.map((consumable) => this.mapToConsumable(consumable))
        )
      );
  }

  public addConsumable(
    userId: string,
    consumable: Consumable
  ): Observable<void> {
    const id = this.afs.createId();

    return from(
      this.afs
        .collection('users')
        .doc(userId)
        .collection<ConsumableDto>(this.collection)
        .doc(id)
        .set(this.mapToConsumableDto({ ...consumable, id }))
    );
  }

  public updateConsumable(
    userId: string,
    consumable: Consumable
  ): Observable<void> {
    return from(
      this.afs
        .collection('users')
        .doc(userId)
        .collection<ConsumableDto>(this.collection)
        .doc(consumable.id)
        .set(this.mapToConsumableDto({ ...consumable }))
    );
  }

  public deleteConsumable(
    userId: string,
    consumableId: string
  ): Observable<void> {
    return from(
      this.afs
        .collection('users')
        .doc(userId)
        .collection<ConsumableDto>(this.collection)
        .doc(consumableId)
        .delete()
    );
  }

  private mapToConsumable(consumableDto: ConsumableDto): Consumable {
    return {
      id: consumableDto._id,
      beginDate: DateTime.fromMillis(consumableDto.beginTimestamp),
      expirationDate: consumableDto.beginTimestamp
        ? DateTime.fromMillis(consumableDto.expirationTimestamp)
        : null,
      beginDistance: consumableDto.beginDistance,
      expirationDistance: consumableDto.expirationDistance,
      type: ConsumableType[consumableDto.type],
      description: consumableDto.description,
      price: consumableDto.price,
    };
  }

  private mapToConsumableDto(consumable: Consumable): ConsumableDto {
    return {
      _id: consumable.id,
      _creationTimestamp: DateTime.local().toMillis(),
      beginTimestamp: consumable.beginDate.toMillis(),
      expirationTimestamp: consumable.expirationDate.toMillis(),
      beginDistance: consumable.beginDistance,
      expirationDistance: consumable.expirationDistance,
      type: consumable.type,
      description: consumable.description,
      price: consumable.price,
    };
  }
}
