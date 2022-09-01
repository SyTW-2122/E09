import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MonedasService } from 'src/app/services/monedas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Monedas } from 'src/app/pages/home/home.component';


export interface MonedasUser {
  nombre: String;
  symbol: String;
  inversion: Number;
  cantidad: Number;
  preciocompra: Number;
  precioactual: Number;
  p24h: Number;
  p7d: Number;
  beneficio: Number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  listMonedas: MonedasUser[] = [];
  displayedColumns: string[] = ['nombre', 'symbol', 'inversion', 'cantidad', 'preciocompra', 'precioactual', 'p24h', 'p7d', 'beneficio', 'acciones'];
  dataSource = new MatTableDataSource(this.listMonedas);

  constructor(private transactionsService: TransactionsService, private monedasService: MonedasService, private router: Router) {

  }
  ngOnInit(): void {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token != null) {
      this.transactionsService.getTransactions(token).subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
}
