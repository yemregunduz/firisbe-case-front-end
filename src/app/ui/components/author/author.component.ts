import { Component, OnInit } from '@angular/core';
import { CreateAuthorDialogComponent } from 'src/app/dialogs/create-author-dialog/create-author-dialog.component';
import { Gender } from 'src/app/enums/gender.enum';
import { AuthorModel } from 'src/app/models/authors/author.model';
import { ListResponseModel } from 'src/app/models/base-response/list-response.model';
import { DynamicRequestModel } from 'src/app/models/dynamic-request/dynamic-request.model';
import { AuthorService } from 'src/app/services/author.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  constructor(
    private authorService: AuthorService,
    private dialogService: DialogService
  ) {}
  authors: ListResponseModel<AuthorModel>;
  genderOptions:{value:number,label:string}[] = []
  lastFilter: DynamicRequestModel = {
    sort: [
      {
        field: 'firstName',
        dir: 'asc',
      },
    ],
  };
  currentRowCount: number = 12;
  currentPage = 0;
  async ngOnInit(): Promise<void> {
    this.getGenderOptions();
    await this.getAuthors(this.currentPage, this.currentRowCount);
  }
  async getAuthors(currentPage = 0, pageSize = 12) {
    this.authors = await this.authorService.getListByDynamicQuery(
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
  getGenderOptions(){
    this.genderOptions = Object.keys(Gender).slice(2)
                          .map(key => ({value: Gender[key], label: key == 'Female' ? "Kadın" : "Erkek"}));
  }
  openCreateAuthorDialog() {
    const dialogRef = this.dialogService.openDialog({
      componentType: CreateAuthorDialogComponent,
      options: {
        maxWidth: '800px',
      },
      data:{
        genderOptions: this.genderOptions
      }
    });
    dialogRef.componentInstance.onCreated.subscribe(async () => {
      dialogRef.close();
      await this.getAuthors(this.currentPage, this.currentRowCount);
    });
  }
}
