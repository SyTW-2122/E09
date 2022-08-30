import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private loginService: LoginService){

  }

  ngOnInit() {
    let token = localStorage.getItem("ACCESS_TOKEN")
    if(token != null){
      this.loginService.validate(token).subscribe({
        next: (res) => {
          console.log("Res:", res)
        },
        error: (e) => {
          console.log("Error:", e)
          localStorage.removeItem("ACCESS_TOKEN")
          localStorage.removeItem("EXPIRES_IN")
        }
      })
    }
  }
}
