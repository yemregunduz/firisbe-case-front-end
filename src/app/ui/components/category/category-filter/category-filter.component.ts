import { Component,EventEmitter,Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicRequestModel } from 'src/app/models/dynamic-request/dynamic-request.model';
import { DynamicFilterService } from 'src/app/shared/services/dynamic-filter.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent {
  @Output() applyFilter: EventEmitter<DynamicRequestModel> = new EventEmitter();

  categoryFilterForm: FormGroup;
  formControlNames:string[] = ['name','description']
  constructor(private dynamicFilterService:DynamicFilterService) {}

  ngOnInit() {
     this.createAuthorFilterForm();
  }
  createAuthorFilterForm() {
    this.categoryFilterForm = this.dynamicFilterService.createFilterForm(
      this.formControlNames
    );
  }

  createDynamicRequestModel(){
    if(!this.categoryFilterForm.dirty){
      return
    }
    let dynamicRequestModel:DynamicRequestModel =  this.dynamicFilterService.createDynamicRequestModel(this.categoryFilterForm,this.formControlNames)
    this.applyFilter.emit(dynamicRequestModel.filter.field ==null ? null:dynamicRequestModel)
  }
  resetFilterForm(){
    this.dynamicFilterService.resetFilterForm(this.categoryFilterForm)
  }

}
