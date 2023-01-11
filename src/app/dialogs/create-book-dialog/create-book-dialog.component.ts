import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateBookModel } from 'src/app/models/books/create-book.model';
import { BookService } from 'src/app/services/book.service';
import { FormService } from 'src/app/shared/services/form.service';
import * as Messages from "src/app/shared/constants/messages.constant"
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertify-type.enum';
@Component({
  selector: 'app-create-book-dialog',
  templateUrl: './create-book-dialog.component.html',
  styleUrls: ['./create-book-dialog.component.scss'],
})
export class CreateBookDialogComponent implements OnInit {
  bookForm: FormGroup;
  @Output() onCreated = new EventEmitter()
  constructor(
    private formService: FormService,
    private bookService: BookService,
    private alertifyService:AlertifyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.createBookForm();
  }

  createBookForm() {
    this.bookForm = this.formService.createFormGroup([
      {
        formControlName: 'categoryId',
        initialValue: '',
        validators: [Validators.required],
      },
      {
        formControlName: 'authorId',
        initialValue: '',
        validators: [Validators.required],
      },
      {
        formControlName: 'name',
        initialValue: '',
        validators: [Validators.required, Validators.minLength(2)],
      },
      {
        formControlName: 'isbn',
        initialValue: '',
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(13),
        ],
      },
    ]);
  }
  async createBook(){
    if(this.formService.formIsValid(this.bookForm)){
      const createBookModel:CreateBookModel = Object.assign({},this.bookForm.value)
      await this.bookService.create(createBookModel,()=>{
        this.onCreated.emit();
        this.alertifyService.message(`${createBookModel.name} ${Messages.CreatedSuccessfully}`,{
          messageType:AlertifyMessageType.Success
        })
      })
    }
  }
  validateFormControl(formControlName:string){
    return this.formService.validateFormControl(this.bookForm,formControlName)
  }
}
