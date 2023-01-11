import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookFilterComponent } from './book-filter/book-filter.component';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '../pagination/pagination.module';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { TableHeaderModule } from '../table-header/table-header.module';

@NgModule({
  declarations: [BookComponent, BookFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PaginationModule,
    TableHeaderModule,
    DialogsModule,
  ],
  exports: [BookComponent],
})
export class BookModule {}
