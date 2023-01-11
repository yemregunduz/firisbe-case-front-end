import { BaseModel } from "../base-response/base.model";
import { BookModel } from "../books/book.model";

export interface CategoryModel extends BaseModel{
    name:string,
    description:string
    books:BookModel[]
}