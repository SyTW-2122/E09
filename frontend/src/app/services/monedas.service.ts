/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  constructor() { }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monedas } from '../pages/home/home.component';


@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  //URL_API: string = "http://localhost:4000/monedas"
  URL_API: string = "https://portfolio-e09.herokuapp.com/monedas"

  constructor(private http: HttpClient) {
   }
  getMonedas()  {
    return this.http.get<Monedas[]>(this.URL_API)
  }
  getMoneda(name: string)  {
    return this.http.get<Monedas>(this.URL_API + '/' + name)
  }

}