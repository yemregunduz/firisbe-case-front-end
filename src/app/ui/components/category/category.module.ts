import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { DataNotFoundModule } from '../data-not-found/data-not-found.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TableHeaderModule } from '../table-header/table-header.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoryComponent, CategoryFilterComponent],
  imports: [
    CommonModule,
    DataNotFoundModule,
    PaginationModule,
    TableHeaderModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: CategoryComponent }]),
  ],
  exports: [CategoryComponent],
})
export class CategoryModule {}
