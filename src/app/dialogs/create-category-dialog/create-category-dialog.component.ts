import { Component, Output, EventEmitter} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertify-type.enum';
import { CreateCategoryModel } from 'src/app/models/categories/create-category.model';
import { CategoryService } from 'src/app/services/category.service';
import * as Messages from "src/app/shared/constants/messages.constant"
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent {
  categoryForm: FormGroup;
  @Output() onCreated = new EventEmitter();
  constructor(
    private formService: FormService,
    private categoryService: CategoryService,
    private alertifyService: AlertifyService,
  ) {}
  ngOnInit(): void {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryForm = this.formService.createFormGroup([
      {
        formControlName: 'name',
        initialValue: '',
        validators: [Validators.required, Validators.minLength(2)],
      },
      {
        formControlName: 'description',
        initialValue: '',
        validators: [Validators.required],
      },
    ]);
  }
  async createCategory() {
    if (this.formService.formIsValid(this.categoryForm)) {
      const createCategoryModel: CreateCategoryModel = Object.assign(
        {},
        this.categoryForm.value
      );
      await this.categoryService.create(createCategoryModel, () => {
        this.onCreated.emit();
        this.alertifyService.message(
          `${createCategoryModel.name} ${Messages.CreatedSuccessfully}`,
          {
            messageType: AlertifyMessageType.Success,
          }
        );
      });
    }
  }
  validateFormControl(formControlName: string) {
    return this.formService.validateFormControl(
      this.categoryForm,
      formControlName
    );
  }
}
