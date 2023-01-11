import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './ui/components/book/book.component';
import { PageNotFoundComponent } from './ui/components/page-not-found/page-not-found.component';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {path:"",component:LayoutComponent,children:[
    {path:"",component:BookComponent},
    {path:"authors", loadChildren:()=> import("./ui/components/author/author.module").then(module=>module.AuthorModule)},
    {path:"categories", loadChildren:()=> import("./ui/components/category/category.module").then(module=>module.CategoryModule)},
  ]},
  {path:"**",pathMatch:"full",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
