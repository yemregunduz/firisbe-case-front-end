import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertify-type.enum';
import { CreateAuthorModel } from 'src/app/models/authors/create-author.model';
import { AuthorService } from 'src/app/services/author.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { FormService } from 'src/app/shared/services/form.service';
import * as Messages from 'src/app/shared/constants/messages.constant';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-author-dialog',
  templateUrl: './create-author-dialog.component.html',
  styleUrls: ['./create-author-dialog.component.scss'],
})
export class CreateAuthorDialogComponent {
  authorForm: FormGroup;
  @Output() onCreated = new EventEmitter();
  constructor(
    private formService: FormService,
    private authorService: AuthorService,
    private alertifyService: AlertifyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.createAuthorForm();
  }

  createAuthorForm() {
    this.authorForm = this.formService.createFormGroup([
      {
        formControlName: 'firstName',
        initialValue: '',
        validators: [Validators.required, Validators.minLength(2)],
      },
      {
        formControlName: 'lastName',
        initialValue: '',
        validators: [Validators.required],
      },
      {
        formControlName: 'country',
        initialValue: '',
        validators: [Validators.required],
      },
      {
        formControlName: 'age',
        initialValue: '',
        validators: [Validators.required, Validators.min(0)],
      },
      {
        formControlName : 'gender',
        initialValue: null,
        validators:[Validators.required]
      }
    ]);
  }
  async createAuthor() {
    if (this.formService.formIsValid(this.authorForm)) {
      const createAuthorModel: CreateAuthorModel = Object.assign(
        {},
        this.authorForm.value
      );
      await this.authorService.create(createAuthorModel, () => {
        this.onCreated.emit();
        this.alertifyService.message(
          `${createAuthorModel.firstName} ${Messages.CreatedSuccessfully}`,
          {
            messageType: AlertifyMessageType.Success,
          }
        );
      });
    }
  }
  validateFormControl(formControlName: string) {
    return this.formService.validateFormControl(
      this.authorForm,
      formControlName
    );
  }
}
