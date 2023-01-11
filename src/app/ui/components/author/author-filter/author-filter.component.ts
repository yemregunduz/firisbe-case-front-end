import { Component,EventEmitter,Input,Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicQueryOperator } from 'src/app/enums/dynamic-query-operator.enum';
import { Gender } from 'src/app/enums/gender.enum';
import { DynamicRequestModel } from 'src/app/models/dynamic-request/dynamic-request.model';
import { DynamicFilterService } from 'src/app/shared/services/dynamic-filter.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-author-filter',
  templateUrl: './author-filter.component.html',
  styleUrls: ['./author-filter.component.scss']
})
export class AuthorFilterComponent {
  @Output() applyFilter: EventEmitter<DynamicRequestModel> = new EventEmitter();
  @Input() genderOptions :{value:number,label:string}[] = []
  authorFilterForm: FormGroup;
  formControlNames:string[] = ['firstName','lastName','gender','country']
  constructor(private dynamicFilterService:DynamicFilterService) {}

  ngOnInit() {
     this.createAuthorFilterForm();
  }
  createAuthorFilterForm() {
    this.authorFilterForm = this.dynamicFilterService.createFilterForm(
      this.formControlNames
    );
  }

  createDynamicRequestModel(){
    if(!this.authorFilterForm.dirty){
      return
    }
    let dynamicRequestModel:DynamicRequestModel =  this.dynamicFilterService.createDynamicRequestModel(this.authorFilterForm,this.formControlNames)
    this.applyFilter.emit(dynamicRequestModel.filter.field ==null ? null:dynamicRequestModel)
  }
  resetFilterForm(){
    this.dynamicFilterService.resetFilterForm(this.authorFilterForm)
  }

}
