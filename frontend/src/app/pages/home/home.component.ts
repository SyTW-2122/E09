import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MonedasService } from 'src/app/services/monedas.service';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  listMonedas: Monedas[] = [];  
  displayedColumns: string[] = ['nombre', 'symbol', 'precio', 'p1h', 'p24h', 'p7d' ,'marketcap', 'circulatingSupply',  'acciones'];
  dataSource= new MatTableDataSource(this.listMonedas);
  monedaName!: Monedas
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


  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  moneda(element: Monedas) {
    localStorage.setItem("MONEDA", element.nombre.toString());
  }

  format(numb: number) {
    return Intl.NumberFormat('en-US').format(numb)
  }
}
