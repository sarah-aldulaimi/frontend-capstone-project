import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from '../category/add-category/add-category.component';
import { ProductListAdminComponent } from './product-list-admin/product-list-admin.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'add-product',
    component: ProductListAdminComponent
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
