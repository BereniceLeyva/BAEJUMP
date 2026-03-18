import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LorePage } from './lore.page';

const routes: Routes = [
  {
    path: '',
    component: LorePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LorePageRoutingModule {}
