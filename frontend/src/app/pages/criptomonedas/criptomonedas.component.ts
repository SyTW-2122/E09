import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  nombre: string;
  position: number;
  precio: number;
  horas: number;
  dias: number;
  volumen: number;
  capital: number;
}



@Component({
  selector: 'app-criptomonedas',
  templateUrl: './criptomonedas.component.html',
  styleUrls: ['./criptomonedas.component.scss']
})
export class CriptomonedasComponent implements OnInit {

 listCripto: PeriodicElement[] = [
    {position: 1, nombre: 'Bitcoin', precio: 1, horas: 8, dias: 9, volumen: 7, capital: 6},
    {position: 2, nombre: 'Ethereum', precio: 2, horas: 8, dias: 9, volumen: 7, capital: 6},
    {position: 3, nombre: 'Tether', precio: 3, horas: 8, dias: 9, volumen: 7, capital: 6},
    {position: 4, nombre: 'USD Coin', precio: 4, horas: 8, dias: 9, volumen: 7, capital: 6},
    {position: 5, nombre: 'BNB', precio: 5, horas: 8, dias: 9, volumen: 7, capital: 6},
    {position: 6, nombre: 'Binance', precio: 6, horas: 8, dias: 9, volumen: 7, capital: 6},
    {position: 7, nombre: 'XRP', precio: 7, horas: 8, dias: 9, volumen: 7, capital: 6},
    {position: 8, nombre: 'Cardano', precio: 8, horas: 8, dias: 9, volumen: 7, capital: 6},
  ];

  displayedColumns: string[] = ['position', 'nombre', 'precio', 'horas', 'dias', 'volumen', 'capital', 'acciones'];
  dataSource = new MatTableDataSource(this.listCripto);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
