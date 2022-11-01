import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { DashboardOrderDetailsComponent } from './dashboard-order/dashboard-order-details/dashboard-order-details.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';

const DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardProfileComponent
  },
  {
    path: 'shopping-cart',
    component: DashboardSavedItemComponent
  },
  {
    path: 'profile',
    component: DashboardProfileComponent
  },
  {
    path: 'profile/:id',
    component: DashboardProfileComponent
  },
  {
    path: 'orders',
    component: DashboardOrderComponent
  },
  {
    path: 'orders/:orderParams',
    component: DashboardOrderDetailsComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
