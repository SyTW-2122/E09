/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  constructor() { }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  URL_API = "http://localhost:4000/monedas"

  constructor(private http: HttpClient) { }
  getMonedas()  {
    return this.http.get(this.URL_API)
  }
}