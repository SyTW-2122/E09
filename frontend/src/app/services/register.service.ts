import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  //URL_API = "http://localhost:4000/register"
  URL_API: string = "https://portfolio-e09.herokuapp.com/register"

  private token!: string | null;

  constructor(private http: HttpClient) { }

  registerUser(body: Object)  {
    console.log(body)
    return this.http.post(this.URL_API ,body, {responseType: "text"})
  }
}
