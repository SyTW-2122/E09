import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MonedasService } from 'src/app/services/monedas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Monedas } from 'src/app/pages/home/home.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface MonedasUser {
  nombre: String;
  symbol: String;
  inversion: Number;
  cantidad: Number;
  preciocompra: Number;
  precioactual: Number;
  p24h: Number;
  p7d: Number;
  porcentajeRendimiento: Number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  datosM: any = [];
  listMonedas: MonedasUser[] = [];
  displayedColumns: string[] = ['nombre', 'symbol', 'inversion', 'cantidad', 'preciocompra', 'precioactual', 'p24h', 'p7d', 'porcentajeRendimiento', 'acciones'];
  dataSource = new MatTableDataSource(this.listMonedas);
  token = localStorage.getItem("ACCESS_TOKEN");
  form: FormGroup;

  constructor(private fb: FormBuilder, private transactionsService: TransactionsService, private monedasService: MonedasService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio_actual: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    if (this.token != null) {
      this.transactionsService.getTransactions(this.token).subscribe({
        next: (res: any) => {
          console.log(res)
          this.dataSource = new MatTableDataSource(res.transactionsResult);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
    this.datosMoneda()
    
  }

  datosMoneda() {
    let moneda = localStorage.getItem("MONEDA")
    if (moneda == null) {
      moneda = "Bitcoin"
    }
    this.monedasService.getMonedas().subscribe({
      next: (res: any) => {
        for (let x of res) {
          this.datosM.push(x.nombre)
        }
        console.log(this.datosM);
      },
      error: (e:any) => {
        console.log(e);
      }
    });
  }

  format(numb: number) {
    return Intl.NumberFormat('en-US').format(numb)
  }

  agregar() {
    const nombre = this.form.value.nombre;
    const cantidad = this.form.value.cantidad;
    const precio = this.form.value.precio;

    let nuevaTransaccion = {
      "nombre": nombre,
      "cantidad": cantidad,
      "precio": precio,
      "tipo": "tipo",
      "fecha": "fecha"
    }

    this.transactionsService.postTransaction(token)
  }

  actualizar() {
  }

  eliminar(moneda: MonedasUser){
    console.log(moneda)
    if (this.token != null) {
      this.transactionsService.deleteTransaction(this.token, moneda.nombre.toString()).subscribe({
        next: (res: any) => {
          console.log(res)
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
