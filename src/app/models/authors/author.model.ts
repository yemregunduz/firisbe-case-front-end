import { Gender } from "../../enums/gender.enum";
import { BaseModel } from "../base-response/base.model";
import { BookModel } from "../books/book.model";

export interface AuthorModel extends BaseModel{
    firstName:string,
    lastName:string,
    fullName:string,
    age:number,
    gender:Gender
    country:string
    books: BookModel[]
}