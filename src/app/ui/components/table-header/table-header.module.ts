import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from './table-header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataNotFoundModule } from '../data-not-found/data-not-found.module';



@NgModule({
  declarations: [
    TableHeaderComponent
  ],
  imports: [
    CommonModule,DataNotFoundModule, SharedModule
  ],
  exports:[
    TableHeaderComponent
  ]
})
export class TableHeaderModule { }
