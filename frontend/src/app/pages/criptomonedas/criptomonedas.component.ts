import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MonedasService } from 'src/app/services/monedas.service';

export interface Monedas {
  nombre: string;
  precio: number;
  supply: number;

}
@Component({
  selector: 'app-criptomonedas',
  templateUrl: './criptomonedas.component.html',
  styleUrls: ['./criptomonedas.component.scss']
})

export class CriptomonedasComponent implements OnInit {
  
  listMonedas: Monedas[] = [];  
  displayedColumns: string[] = ['nombre', 'precio', 'supply', 'acciones'];
  dataSource= new MatTableDataSource(this.listMonedas);

  constructor(private monedasService: MonedasService) { }

  ngOnInit(): void {
    this.monedasService.getMonedas().subscribe({
     next:  (res) => {
      this.dataSource = new MatTableDataSource(res)
      },
     error: (e) => {
      console.log(e)
      } 
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
