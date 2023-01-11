import { Component, Output,Input, EventEmitter,OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicQueryOperator } from 'src/app/enums/dynamic-query-operator.enum';
import { CategoryModel } from 'src/app/models/categories/category.model';
import { DynamicRequestModel } from 'src/app/models/dynamic-request/dynamic-request.model';
import { CategoryService } from 'src/app/services/category.service';
import { DynamicFilterService } from 'src/app/shared/services/dynamic-filter.service';
import { CustomFormControl, FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss'],
})
export class BookFilterComponent implements OnInit{
  @Input() categories:CategoryModel[] = []
  @Output() applyFilter: EventEmitter<DynamicRequestModel> = new EventEmitter();
  bookFilterForm: FormGroup;
  formControlNames:string[] = ['name','author.firstName','author.lastName','categoryId','author.country','isbn']
  constructor(private formService: FormService,private dynamicFilterService:DynamicFilterService) {}

  ngOnInit() {
     this.createBookFilterForm();
  }
  createBookFilterForm() {
    this.bookFilterForm = this.dynamicFilterService.createFilterForm(
      this.formControlNames
    );
  }

  createDynamicRequestModel(){
    if(!this.bookFilterForm.dirty){
      return;
    }
    let dynamicRequestModel:DynamicRequestModel =  this.dynamicFilterService.createDynamicRequestModel(this.bookFilterForm,this.formControlNames)
    this.applyFilter.emit(dynamicRequestModel.filter.field ==null ? null:dynamicRequestModel)
  }
  resetFilterForm(){
    this.dynamicFilterService.resetFilterForm(this.bookFilterForm)
    this.bookFilterForm.controls["categoryId"].setValue("")
    document.getElementById("txtName").focus()
  }
}
