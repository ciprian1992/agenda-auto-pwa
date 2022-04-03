import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsumablesService } from '../data/consumables/consumables.service';
import { ConsumableVm } from './consumable-vm';

@Injectable({ providedIn: 'root' })
export class ConsumablesVmService {
  consumablesVm$: Observable<ConsumableVm[]>;

  constructor(private readonly consumablesService: ConsumablesService) {
    this.consumablesVm$ = this.consumablesService.consumables$.pipe(
      map((consumables) =>
        consumables.map((consumable) => new ConsumableVm(consumable))
      )
    );
  }
}
