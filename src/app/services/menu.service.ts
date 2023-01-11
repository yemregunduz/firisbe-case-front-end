import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  #menuItems:MenuItem[] = [
    {title:"Books",icon:"book",url:""},
    {title:"Authors",icon:"drive_file_rename_outline",url:"authors"},
    {title:"Categories",icon:"category",url:"categories"},

  ]
  #bottomMenuItems:MenuItem[] = [
    {title:"Send Feedback",icon:"feedback",url:"send-feedback"},
    {title:"Message Me",icon:"message",url:"message"}
  ]
  constructor() { }
  getMenuItems(){ 
    return {mainMenuItems:this.#menuItems,bottomMenuItems:this.#bottomMenuItems}
  }
}
export interface MenuItem{
  title:string,
  icon:string,
  url:string,
}
