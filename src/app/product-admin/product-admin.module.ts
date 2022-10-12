import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgParticlesModule } from 'ng-particles';
import { ProductRoutingModule } from './product-admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductHeroComponent } from './product-list/product-hero/product-hero.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductListAdminComponent } from './product-list-admin/product-list-admin.component';
import { AddCategoryComponent } from './add-category/add-category.component';
// import { importType } from '@angular/compiler/src/output/output_ast';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductHeroComponent,
    ProductListAdminComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MatExpansionModule,
    NgParticlesModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductAdminModule {}
