import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  URL_API: string = "https://portfolio-e09.herokuapp.com/transactions"


  constructor(private http: HttpClient) { }

  getTransactions(token : string) {
    return this.http.get(this.URL_API + '/' + token)
  }

  postTransaction() {

  }

  deleteTransaction(){

  }

  updateTransaction() {

  }
}
