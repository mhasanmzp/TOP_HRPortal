import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetGridPage } from './asset-grid-view.page';

const routes: Routes = [
  {
    path: '',
    component: AssetGridPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetGridViewPageRoutingModule {}
