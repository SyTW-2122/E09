import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MonedasService } from 'src/app/services/monedas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';

export interface Monedas {
  nombre: String;
  symbol: String;
  precio: Number;
  supply: Number;
  p24h: Number;
  p7d: Number;
  marketcap: Number;
  circulatingSupply: Number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  listMonedas: Monedas[] = [];
  displayedColumns: string[] = ['nombre', 'symbol', 'inversion', 'cantidad', 'preciocompra', 'precioactual', 'p24h', 'p7d', 'beneficio', 'acciones'];
  dataSource = new MatTableDataSource(this.listMonedas);

  constructor(private transactionsService: TransactionsService, private router: Router) {

  }
  ngOnInit(): void {
    let token = localStorage.getItem("TOKEN")
    if (token != null) {
      this.transactionsService.getTransactions(token).subscribe({
        next: (res: any) => {
          let tablita = res.transactionsResult

          console.log(res)
          this.dataSource = new MatTableDataSource(tablita)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (e: any) => {
          console.log(e)
        }
      })
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

}
