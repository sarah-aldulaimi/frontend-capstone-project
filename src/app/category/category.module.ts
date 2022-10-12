import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgParticlesModule } from 'ng-particles';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    MatExpansionModule,
    NgParticlesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule {}
