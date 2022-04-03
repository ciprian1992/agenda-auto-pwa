import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddConsumablePage } from './add-consumable.page';

const routes: Routes = [
  {
    path: '',
    component: AddConsumablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddConsumablePageRoutingModule {}
