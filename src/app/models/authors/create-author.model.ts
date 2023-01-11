import { Gender } from "src/app/enums/gender.enum";

export interface CreateAuthorModel{
    firstName:string,
    lastName:string,
    age:number,
    country:string,
    gender:Gender
}