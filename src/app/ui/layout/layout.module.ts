import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { LayoutComponentsModule } from './layout-components/layout-components.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,RouterModule,LayoutComponentsModule
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
