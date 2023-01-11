import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertify-type.enum';
import { FormValidationError } from '../constants/messages.constant';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private alertifyService:AlertifyService) {}
  createFormGroup(data: Partial<CustomFormControl>[]) {
    const group = {};
    data.forEach((control) => {
      group[control.formControlName] = new FormControl(
        control.initialValue || '',
        Validators.compose(control.validators)
      );
    });
    const form = new FormGroup(group);
    return form;
  }
  formIsValid(formGroup: FormGroup, validationMessage?: string): boolean {
    if (formGroup.valid) {
      return true;
    }
    formGroup.markAllAsTouched();
    this.alertifyService.message(validationMessage ?? FormValidationError,{
      messageType:AlertifyMessageType.Error,
      dismissOthers:true
    })
    return false;
  }
  createCustomFormControls(formControlNames: string[]) {
    const customFormControls: CustomFormControl[] = [];
    formControlNames.forEach((name) => {
      customFormControls.push({ formControlName: name });
    });
    return customFormControls;
  }
  validateFormControl(formGroup: FormGroup, formControlName: string) {
    return (
      (formGroup.controls[formControlName].dirty ||
        formGroup.controls[formControlName].touched) &&
      formGroup.controls[formControlName].invalid
    );
  }
}

export class CustomFormControl{
  formControlName:string
  initialValue?:any
  validators?:ValidatorFn[]
}