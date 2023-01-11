import { Component } from '@angular/core';
import { CreateCategoryDialogComponent } from 'src/app/dialogs/create-category-dialog/create-category-dialog.component';
import { ListResponseModel } from 'src/app/models/base-response/list-response.model';
import { CategoryModel } from 'src/app/models/categories/category.model';
import { DynamicRequestModel } from 'src/app/models/dynamic-request/dynamic-request.model';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  constructor(
    private authorService: CategoryService,
    private dialogService: DialogService
  ) {}
  categories: ListResponseModel<CategoryModel>;
  genderOptions:{value:number,label:string}[] = []
  lastFilter: DynamicRequestModel = {
    sort: [
      {
        field: 'name',
        dir: 'asc',
      },
    ],
  };
  currentRowCount: number = 12;
  currentPage = 0;
  async ngOnInit(): Promise<void> {
    await this.getAuthors(this.currentPage, this.currentRowCount);
  }
  async getAuthors(currentPage = 0, pageSize = 12) {
    this.categories = await this.authorService.getListByDynamicQuery(
      { page: currentPage, pageSize: pageSize },
      this.lastFilter
    );
  }
  async applyFilter(dynamicRequestModel: DynamicRequestModel) {
    dynamicRequestModel != null
      ? (this.lastFilter.filter = dynamicRequestModel.filter)
      : delete this.lastFilter.filter;
    this.currentPage = 0;
    await this.getAuthors(0, this.currentRowCount);
  }
  async onPageChange(selectedPage: number) {
    if (this.currentPage != selectedPage)
      await this.getAuthors(selectedPage, this.currentRowCount);
    this.currentPage = selectedPage;
  }
  openCreateCategoryDialog() {
    const dialogRef = this.dialogService.openDialog({
      componentType: CreateCategoryDialogComponent,
      options: {
        maxWidth: '800px',
      },
    });
    dialogRef.componentInstance.onCreated.subscribe(async () => {
      dialogRef.close();
      await this.getAuthors(this.currentPage, this.currentRowCount);
    });
  }
}
