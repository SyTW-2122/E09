import { Component, OnInit } from '@angular/core';
import { MonedasService} from 'src/app/services/monedas.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.scss']
})

export class MonedasComponent implements OnInit {
  datosM:any = []
  isLoaded: boolean = false
  constructor(private monedaService : MonedasService, private router: Router) { }

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
        this.isLoaded = true
      },
      error: (e:any) => {
        console.log(e);
      }
    });
  }

  format(numb: number) {
    return Intl.NumberFormat('en-US').format(numb)
  }

  toHome(){
    this.router.navigateByUrl('/home')
  }
}
