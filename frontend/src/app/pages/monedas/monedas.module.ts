import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonedasRoutingModule } from './monedas-routing.module';
import { MonedasComponent } from './monedas.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MonedasComponent
  ],
  imports: [
    CommonModule,
    MonedasRoutingModule,
    SharedModule
  ]
})
export class MonedasModule { }
