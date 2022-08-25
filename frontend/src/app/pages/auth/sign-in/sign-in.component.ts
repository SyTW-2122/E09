import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  template: '<app-form2><app-form2>',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    /*let body: Object = {
      "username": "Andres",
      "password": "qwerty"
    }
    this.loginService.getUser(body).subscribe(
      res => console.log(res),
      err => console.log(err)
    )*/
  }

  login() {
    // Este sería el método que se activa cuando se presiona el botón
    // Recoge los datos de los campos de texto y mandárselos al backend 
  }

}
