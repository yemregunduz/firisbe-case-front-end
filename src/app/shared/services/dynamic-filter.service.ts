import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicQueryOperator } from 'src/app/enums/dynamic-query-operator.enum';
import { DynamicRequestModel } from 'src/app/models/dynamic-request/dynamic-request.model';
import { FormService } from './form.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicFilterService {

  constructor(private formService:FormService) { }

  createDynamicRequestModel(filterForm:FormGroup,formControlNames:string[]){

    let dynamicRequestModel:DynamicRequestModel = {
      filter:{
        field:null,
        operator:null,
        value : null,
        filters : []
      }
    }
    if(!filterForm.dirty){
      return dynamicRequestModel;
    }
    let isFirst = true
    formControlNames.forEach(formControlName=>{
      const currentFormControl = filterForm.controls[formControlName]
      if(currentFormControl.value != null && currentFormControl.value != '' && isFirst){
        dynamicRequestModel.filter.field = formControlName
        dynamicRequestModel.filter.operator = (formControlName.includes("Id") || formControlName.includes("gender")) ? DynamicQueryOperator.Equal : DynamicQueryOperator.Contains,
        dynamicRequestModel.filter.value = currentFormControl.value
        isFirst = false
      }
      else if(currentFormControl.value !=null && currentFormControl.value && !isFirst){
        dynamicRequestModel.filter.logic = "and"
        dynamicRequestModel.filter.filters.push({
          field:formControlName,
          operator: (formControlName.includes("Id") || formControlName.includes("gender")) ? DynamicQueryOperator.Equal : DynamicQueryOperator.Contains,
          value:currentFormControl.value
        })
      }
    })
    return dynamicRequestModel
  }
  createFilterForm(formControlNames:string[]){
    return this.formService.createFormGroup(
      this.formService.createCustomFormControls(formControlNames)
    );
  }
  resetFilterForm(filterForm:FormGroup){
    filterForm.reset()
    filterForm.markAsDirty();
  }
}
