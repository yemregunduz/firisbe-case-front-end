import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreateBookDialogComponent } from 'src/app/dialogs/create-book-dialog/create-book-dialog.component';
import { AuthorModel } from 'src/app/models/authors/author.model';
import { ListResponseModel } from 'src/app/models/base-response/list-response.model';
import { BookModel } from 'src/app/models/books/book.model';
import { CategoryModel } from 'src/app/models/categories/category.model';
import { DynamicRequestModel } from 'src/app/models/dynamic-request/dynamic-request.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [DatePipe],
})
export class BookComponent implements OnInit {
  books: ListResponseModel<BookModel>;
  categories: CategoryModel[] = [];
  authors:AuthorModel[] = [];
  lastFilter: DynamicRequestModel = {
    sort:[{
      field:'createdDate',
      dir:'desc'
    }]
  }
  currentRowCount:number
  currentPage = 0;
  constructor(
    private bookService: BookService,
    private dialogService: DialogService,
    private categoryService: CategoryService,
    private authorService:AuthorService,
  ) {}
  async ngOnInit() {
    await this.getBooks(this.currentPage,this.currentRowCount);
    await this.getCategories();
    await this.getAuthors();
  }
  async applyFilter(dynamicRequestModel: DynamicRequestModel) {
    dynamicRequestModel != null
    ? (this.lastFilter.filter = dynamicRequestModel.filter)
    : delete this.lastFilter.filter;
    this.currentPage = 0
    await this.getBooks(0,this.currentRowCount);
  }
  async onPageChange(selectedPage: number) {
    if (this.currentPage != selectedPage) 
      await this.getBooks(selectedPage,this.currentRowCount);
    this.currentPage = selectedPage;
  }
  async getBooks(currentPage = 0 , pageSize = 5) {
    this.books = await this.bookService.getListByDynamicQuery(
      { page: currentPage, pageSize: pageSize },
      this.lastFilter
    );
  }
  async getCategories(){
    const response = await this.categoryService.getList();
    this.categories = response.data.items;
  }
  async getAuthors(){
    const response = await this.authorService.getList();
    this.authors = response.data.items
  }
  openCreateBookDialog() {
    const dialogRef = this.dialogService.openDialog({
      componentType: CreateBookDialogComponent,
      options: {
        maxWidth: '800px',
      },
      data:{
        categories:this.categories,
        authors:this.authors
      }
    });
    dialogRef.componentInstance.onCreated.subscribe(async ()=>{
      dialogRef.close();
      await this.getBooks(this.currentPage,this.currentRowCount)
    })
  }
  async changeSelectedRowCount(selectedRowCount:number){
    this.currentRowCount = selectedRowCount
    this.currentPage = 0
    await this.getBooks(this.currentPage,this.currentRowCount)
  }
}
