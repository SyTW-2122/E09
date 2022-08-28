import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private readonly router:Router){}
  canActivate():boolean {
    if(localStorage.getItem("ACCESS_TOKEN")) //si usuario logado a home page
    {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}