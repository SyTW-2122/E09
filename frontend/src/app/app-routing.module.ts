import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '', redirectTo:'/home', pathMatch:'full'},
  { path: 'log-in', loadChildren: () => import('./pages/log-in/log-in.module').then(m => m.LogInModule) },
  { path: '**', redirectTo:'/home', pathMatch:'full'}]; //Redirección de ruta por error 404

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
