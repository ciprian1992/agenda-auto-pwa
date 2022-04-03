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
import { ConsumablesService } from 'src/app/services/data/consumables/consumables.service';
import { ConsumableVm } from 'src/app/services/ui/consumable-vm';
import { ConsumablesVmService } from 'src/app/services/ui/consumables-vm.service';

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
    private readonly consumablesVmService: ConsumablesVmService,
    private readonly router: Router
  ) {
    this.consumables$ = this.consumablesVmService.consumablesVm$;

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
