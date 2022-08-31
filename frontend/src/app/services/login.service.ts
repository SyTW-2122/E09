import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //URL_API = "http://localhost:4000/login"
  //URL_API2 = "http://localhost:4000/validate"
  URL_API: string = "https://portfolio-e09.herokuapp.com/login"
  URL_API2: string = "https://portfolio-e09.herokuapp.com/validate"

  private token!: string | null;

  constructor(private http: HttpClient) { }

  loginUser(body: Object)  {
    return this.http.post(this.URL_API ,body)
  }

  logOut() {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")
    }
    return this.token
  }

  validate(token: string){
    let url = this.URL_API2 + '?accessToken=' + token
    return this.http.get(url, {responseType: 'text'})
  }
}
