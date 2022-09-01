import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MonedasService } from 'src/app/services/monedas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

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
  dataSource= new MatTableDataSource(this.listMonedas);

  constructor(private monedasService: MonedasService, private router: Router) { 

  }

  ngOnInit(): void {
    this.monedasService.getMonedas().subscribe({
      next:  (res) => {
         this.dataSource = new MatTableDataSource(res)
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       },
      error: (e) => {
       console.log(e)
       } 
     })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

}
