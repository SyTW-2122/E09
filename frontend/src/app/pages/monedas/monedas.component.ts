import { Component, OnInit } from '@angular/core';
import { MonedasService} from 'src/app/services/monedas.service'

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.scss']
})

export class MonedasComponent implements OnInit {
  datosM!:any
  constructor(private monedaService : MonedasService) { }

  ngOnInit(): void {
    this.datosMoneda();
  }

  datosMoneda() {
    let moneda = localStorage.getItem("MONEDA")
    if (moneda == null) {
      moneda = "Bitcoin"
    }
    this.monedaService.getMoneda(moneda).subscribe({
      next: (res) => {
        this.datosM = res
      },
      error: (e:any) => {
        console.log(e);
      }
    });
  }

  format(numb: number) {
    return Intl.NumberFormat('en-US').format(numb)
  }
}
