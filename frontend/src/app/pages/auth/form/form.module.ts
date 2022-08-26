import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {RouterModule} from '@angular/router'



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }