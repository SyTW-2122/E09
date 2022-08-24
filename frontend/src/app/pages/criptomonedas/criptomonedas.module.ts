import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriptomonedasRoutingModule } from './criptomonedas-routing.module';
import { CriptomonedasComponent } from './criptomonedas.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CriptomonedasComponent
  ],
  imports: [
    CommonModule,
    CriptomonedasRoutingModule,
    SharedModule
  ]
})
export class CriptomonedasModule { }
