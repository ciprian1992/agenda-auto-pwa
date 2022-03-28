import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';
import { ConsumableVm } from './consumable-vm';

@Component({
  selector: 'app-consumables',
  templateUrl: './consumables.page.html',
  styleUrls: ['./consumables.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsumablesPage implements OnDestroy {
  public consumables$: Observable<ConsumableVm[]>;
  private deleteConsumableSubject = new Subject<string>();
  private subscriptiosn = new Subscription();

  constructor(
    public readonly auth: AngularFireAuth,
    private readonly consumablesService: ConsumablesService,
    private readonly router: Router
  ) {
    this.consumables$ = this.consumablesService.consumables$.pipe(
      map((consumables) =>
        consumables.map((consumable) => new ConsumableVm(consumable))
      )
    );

    this.subscriptiosn.add(
      this.deleteConsumableSubject
        .pipe(
          withLatestFrom(this.auth.user),
          mergeMap(([consumableId, { uid }]) =>
            this.consumablesService.deleteConsumable(uid, consumableId)
          ),
          tap(() => this.consumablesService.fetchConsumables())
        )
        .subscribe()
    );
  }

  public navigateToAddConsumable(): void {
    this.router.navigate(['add-consumable']);
  }

  public deleteConsumable(id: string): void {
    this.deleteConsumableSubject.next(id);
  }

  public ngOnDestroy(): void {
    this.subscriptiosn.unsubscribe();
  }
}
