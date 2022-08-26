/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  constructor() { }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monedas } from '../pages/criptomonedas/criptomonedas.component';


@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  URL_API = "http://localhost:4000/monedas"

  constructor(private http: HttpClient) { }
  getMonedas()  {
    return this.http.get<Monedas[]>(this.URL_API)
  }
}