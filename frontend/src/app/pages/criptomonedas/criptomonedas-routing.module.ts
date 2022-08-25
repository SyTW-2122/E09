import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriptomonedasComponent } from './criptomonedas.component';

const routes: Routes = [{ path: '', component: CriptomonedasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriptomonedasRoutingModule { }
