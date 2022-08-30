import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isLogged(){
    if (localStorage.getItem("ACCESS_TOKEN")==null) {
      return true
    }
    return false
  }

  logout(){
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('EXPIRES_IN')
  }
}