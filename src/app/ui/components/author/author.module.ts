import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { RouterModule } from '@angular/router';
import { AuthorFilterComponent } from './author-filter/author-filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from '../pagination/pagination.module';
import { DataNotFoundModule } from '../data-not-found/data-not-found.module';
import { TableHeaderModule } from '../table-header/table-header.module';

@NgModule({
  declarations: [AuthorComponent, AuthorFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationModule,
    DataNotFoundModule,
    TableHeaderModule,
    RouterModule.forChild([{ path: '', component: AuthorComponent }]),
  ],
  exports: [AuthorComponent],
})
export class AuthorModule {}
