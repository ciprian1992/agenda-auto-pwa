import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import {
  ConsumableType,
  ConsumableTypeRecommandation,
  CONSUMABLE_TYPE_RECOMMANDATIONS,
} from 'src/app/services/data/consumables/consumable-type.enum';
import { Consumable } from 'src/app/services/data/consumables/consumable.interface';
import { ConsumablesService } from 'src/app/services/data/consumables/consumables.service';

@Component({
  selector: 'app-add-consumable',
  templateUrl: './add-consumable.page.html',
  styleUrls: ['./add-consumable.page.scss'],
})
export class AddConsumablePage implements OnInit {
  public descriptionControl = new FormControl('');
  public consumableTypeControl = new FormControl('', [Validators.required]);
  public priceControl = new FormControl('');
  public dateBeginControl = new FormControl(DateTime.local(), [
    Validators.required,
  ]);
  public dateExpirationControl = new FormControl(DateTime.local(), [
    Validators.required,
  ]);
  public beginDistanceControl = new FormControl(null);
  public expirationDistanceControl = new FormControl(null, [
    Validators.required,
  ]);
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
    private readonly consumablesService: ConsumablesService,
    public readonly auth: AngularFireAuth,
    private readonly router: Router
  ) {
    this.subscriptions.add(
      this.addConsumableSubject
        .pipe(
          withLatestFrom(this.auth.user),
          mergeMap(([_, { uid }]) => {
            this.formGroup.markAllAsTouched();
            this.formGroup.updateValueAndValidity();
            if (this.formGroup.valid) {
              return this.consumablesService.addConsumable(
                uid,
                this.extractConsumableFromForm()
              );
            }

            return EMPTY;
          })
        )
        .subscribe(() => {
          this.consumablesService.fetchConsumables();
          this.router.navigate(['dashboard']);
        })
    );
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

  public addConsumable(): void {
    this.addConsumableSubject.next();
  }

  private extractConsumableFromForm(): Consumable {
    if (
      this.formGroup.controls['beginDistance'] &&
      this.formGroup.controls['expirationDistance']
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

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
