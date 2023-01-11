import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookDialogComponent } from './create-book-dialog/create-book-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { CreateAuthorDialogComponent } from './create-author-dialog/create-author-dialog.component';
import { CreateCategoryDialogComponent } from './create-category-dialog/create-category-dialog.component';



@NgModule({
  declarations: [
    CreateBookDialogComponent,
    CreateAuthorDialogComponent,
    CreateCategoryDialogComponent
  ],
  imports: [
    CommonModule,SharedModule
  ],
})
export class DialogsModule { }
