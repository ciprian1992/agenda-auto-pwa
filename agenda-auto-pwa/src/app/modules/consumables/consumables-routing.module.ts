import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumablesPage } from './consumables.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumablesPageRoutingModule {}
