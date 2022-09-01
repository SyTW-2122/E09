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
    let token = localStorage.getItem("ACCESS_TOKEN")
    let datos_Actuales: Monedas[];
    this.monedasService.getMonedas().subscribe({
      next: (res) => {
        datos_Actuales = res;
      },
      error: (e) => {
        console.log(e)
      }
    })
    if (token != null) {
      this.transactionsService.getTransactions(token).subscribe({
        next: (res: any) => {
          let tablita = res.transactionsResult
          for (let i = 0; i < tablita.length; i++) {
            let j = 0;
            console.log("actuales",j)
            while (tablita[i].nombreMoneda != datos_Actuales[j].nombre && j < 20) {
              console.log("while")
              
              if (tablita[i].nombreMoneda == datos_Actuales[j].nombre) {
                console.log("antes de meter", tablita[i])
                tablita[i].precio = datos_Actuales[j].precio;
                console.log("depues de meter", tablita[i])

                tablita[i].p24h = datos_Actuales[j].p24h;
                tablita[i].p7d = datos_Actuales[j].p7d;
              }
              j++;
            }
          }
          //  Object { 0: {… }, 1: {… }, 2: {… }, 3: {… }, 4: {… }, 5: {… }, 6: {… }, 7: {… }, 8: {… }, 9: {… }, … }

          //  0: Object { _id: "6308b9321c47a302076f8a4b", marketcap: 15296764266.77445, circulatingSupply: 34155827432.812, … }
          //  1: Object { _id: "6308b9331c47a302076f8a4f", marketcap: 2031437378.5882697, circulatingSupply: 6898652211.267771, … }
          //  2: Object { _id: "6308ba636ac79a302692f46f", marketcap: 3246407331.762678, circulatingSupply: 286370297, … }

          //  comprasGenerales: 20650
          //  transactionsResult: Array(3)[{… }, {… }, {… }]

          // 0: Object { nombreMoneda: "Cardano", rendimiento: -105.21477470611788, cantidad: 100, … }
          // 1: Object { nombreMoneda: "Bitcoin", rendimiento: 2669.3702953414595, cantidad: 0.5, … }
          // 2: Object { nombreMoneda: "Shiba Inu", rendimiento: -450.00000000000006, cantidad: 0, … }
          // length: 3


          const result = Object.assign({}, res, datos_Actuales);
          //console.log(result[0])
          //console.log("RESULTADO FUNCIONA", result)
          this.dataSource = new MatTableDataSource(tablita[1])
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
