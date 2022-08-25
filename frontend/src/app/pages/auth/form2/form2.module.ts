import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form2Component } from './form2.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    Form2Component
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Form2Component
  ]
})
export class Form2Module { }
