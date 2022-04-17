import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslocoPipe } from '@ngneat/transloco';
import { DateTime } from 'luxon';
import { EMPTY, from, Observable, Subject, Subscription } from 'rxjs';
import { mapTo, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  ConsumableType,
  ConsumableTypeRecommandation,
  CONSUMABLE_TYPE_RECOMMANDATIONS,
} from 'src/app/services/data/consumables/consumable-type.enum';
import { Consumable } from 'src/app/services/data/consumables/consumable.interface';
import { ConsumablesService } from 'src/app/services/data/consumables/consumables.service';
import { CalendarEventsService } from 'src/app/services/ui/calendar-events.service';
import { ConsumableVm } from 'src/app/services/ui/consumable-vm';
import { ConsumableTypePipe } from 'src/app/services/ui/type-token.pipe';

@Component({
  selector: 'app-add-consumable',
  templateUrl: './add-consumable.page.html',
  styleUrls: ['./add-consumable.page.scss'],
})
export class AddConsumablePage implements OnInit, OnDestroy {
  public descriptionControl = new FormControl('');
  public consumableTypeControl = new FormControl('', [Validators.required]);
  public priceControl = new FormControl('');
  public dateBeginControl = new FormControl(DateTime.local(), [
    Validators.required,
  ]);
  public dateExpirationControl = new FormControl(DateTime.local(), [
    Validators.required,
  ]);
  public beginDistanceControl = new FormControl(0, [Validators.required]);
  public expirationDistanceControl = new FormControl(0, [Validators.required]);
  public consumableTypes = Object.keys(ConsumableType);

  public formGroup = new FormGroup({
    description: this.descriptionControl,
    consumableType: this.consumableTypeControl,
    price: this.priceControl,
    dateBegin: this.dateBeginControl,
  });

  private addConsumableSubject = new Subject();
  private subscriptions = new Subscription();
  private recommandation: ConsumableTypeRecommandation;

  constructor(
    public readonly alertController: AlertController,
    public readonly calendarEventsService: CalendarEventsService,
    private readonly consumablesService: ConsumablesService,
    public readonly auth: AngularFireAuth,
    private readonly router: Router,
    private readonly consumableTypePipe: ConsumableTypePipe,
    private readonly translocoPipe: TranslocoPipe
  ) {
    this.subscriptions.add(
      this.addConsumableSubject
        .pipe(
          withLatestFrom(this.auth.user),
          mergeMap(([_, { uid }]) => {
            this.formGroup.markAllAsTouched();
            this.formGroup.updateValueAndValidity();
            if (this.formGroup.valid) {
              const consumable: Consumable = this.extractConsumableFromForm();

              return this.consumablesService
                .addConsumable(uid, consumable)
                .pipe(mapTo(new ConsumableVm(consumable)));
            }

            return EMPTY;
          }),
          mergeMap((consumable) => this.showAddEventDialog(consumable))
        )
        .subscribe(() => {
          this.consumablesService.fetchConsumables();
          this.router.navigate(['dashboard']);
        })
    );
  }

  public showAddEventDialog(consumable: Consumable): Observable<any> {
    const alertPromise = from(
      this.alertController.create({
        header: 'Creeaza eveniment in calendar',
        message:
          'Doriti sa creati un eveniment in calendar pentru a va aduce aminte atunci cand trebuie sa faceti schimbul?',
        buttons: [
          {
            text: 'Nu',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
          },
          {
            text: 'Da',
            id: 'confirm-button',
            handler: () => {
              const translatedType = this.translocoPipe.transform(
                this.consumableTypePipe.transform(consumable.type)
              );
              const title = `${translatedType} - schimb`;
              let description = '';
              if (consumable.expirationDistance) {
                description =
                  `Kilometraj schimb anterior: ${consumable.beginDistance} \n` +
                  `Kilometraj recomandare schimb: ${consumable.expirationDistance}`;
              }

              this.calendarEventsService.downloadCalendarEventFile(
                title,
                description,
                consumable.expirationDate
              );
            },
          },
        ],
      })
    );

    return from(alertPromise).pipe(
      tap((alert) => alert.present()),
      mergeMap((alert) => alert.onDidDismiss())
    );
  }

  public addConsumable(): void {
    this.addConsumableSubject.next();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ngOnInit() {
    this.subscriptions.add(
      this.beginDistanceControl.valueChanges.subscribe((beginDistance) => {
        this.expirationDistanceControl.setValue(
          beginDistance + this.recommandation.distanceUsageLimit ?? 0
        );
      })
    );

    this.subscriptions.add(
      this.consumableTypeControl.valueChanges.subscribe((value) => {
        this.recommandation = CONSUMABLE_TYPE_RECOMMANDATIONS.find(
          (recommandation) => recommandation.name === value
        );

        if (this.recommandation.daysUsageLimit) {
          this.formGroup.removeControl('beginDistance');
          this.formGroup.removeControl('expirationDistance');
          this.formGroup.addControl(
            'dateExpiration',
            this.dateExpirationControl
          );
          const beginDate = DateTime.fromISO(this.dateBeginControl.value);
          const expirationDate = beginDate.plus({
            days: this.recommandation.daysUsageLimit,
          });
          this.dateExpirationControl.setValue(expirationDate.toISO());
        } else {
          this.formGroup.addControl('beginDistance', this.beginDistanceControl);
          this.formGroup.addControl(
            'expirationDistance',
            this.expirationDistanceControl
          );
          this.expirationDistanceControl.setValue(
            this.beginDistanceControl.value +
              this.recommandation.distanceUsageLimit ?? 0
          );
          this.formGroup.removeControl('dateExpiration');
        }
      })
    );

    this.dateBeginControl.setValidators([
      Validators.required,
      this.checkDates.bind(this),
    ]);

    this.dateExpirationControl.setValidators([
      Validators.required,
      this.checkDates.bind(this),
    ]);
  }

  private checkDates(): ValidationErrors | null {
    const beginDate = DateTime.fromISO(this.dateBeginControl.value);
    const expirationDate = DateTime.fromISO(this.dateExpirationControl.value);

    return beginDate <= expirationDate ? null : { datesWrong: true };
  }

  private extractConsumableFromForm(): Consumable {
    if (
      this.formGroup.controls.beginDistance &&
      this.formGroup.controls.expirationDistance
    ) {
      return {
        id: '',
        beginDate: DateTime.fromISO(this.dateBeginControl.value),
        beginDistance: this.beginDistanceControl.value,
        expirationDistance: this.expirationDistanceControl.value,
        type: this.consumableTypeControl.value,
        description: this.descriptionControl.value,
        price: this.priceControl.value,
      };
    }

    return {
      id: '',
      beginDate: DateTime.fromISO(this.dateBeginControl.value),
      expirationDate: DateTime.fromISO(this.dateExpirationControl.value),
      type: this.consumableTypeControl.value,
      description: this.descriptionControl.value,
      price: this.priceControl.value,
    };
  }
}
