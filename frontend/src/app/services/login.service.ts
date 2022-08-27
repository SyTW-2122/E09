import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL_API = "http://localhost:4000/login"

  constructor(private http: HttpClient) { }

  loginUser(body: Object)  {
    return this.http.post(this.URL_API ,body)
  }
}
