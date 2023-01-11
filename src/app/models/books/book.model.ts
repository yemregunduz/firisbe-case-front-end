import { AuthorModel } from "../authors/author.model";
import { BaseModel } from "../base-response/base.model";
import { CategoryModel } from "../categories/category.model";

export interface BookModel extends BaseModel{
    name:string
    isbn:string,
    category:CategoryModel
    author:AuthorModel,
}