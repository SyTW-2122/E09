import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form2Module } from 'src/app/pages/auth//form2/form2.module';


import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    Form2Module
  ]
})
export class SignInModule { }
