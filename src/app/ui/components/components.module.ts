import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { SpinnerModule } from './spinner/spinner.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    SpinnerModule
  ],
})
export class ComponentsModule {}
