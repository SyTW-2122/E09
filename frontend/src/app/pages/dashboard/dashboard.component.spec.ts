import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ReactiveFormsModule, MatSnackBarModule, HttpClientModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Se puede agregar una transacción', () => {
    let nombre = component.form.controls['nombre']
    nombre.setValue("Cardano")
    let cantidad = component.form.controls['cantidad']
    cantidad.setValue(4)
    let precio_actual = component.form.controls['precio_actual']
    precio_actual.setValue(10)
    let tipo = component.form.controls['tipo']
    tipo.setValue("compra")
    let fecha = component.form.controls['fecha']
    fecha.setValue("2022/09/09")
    expect(component.form.invalid).toBeFalse();
  });
  it('dashboard test', () => {
    let nombre = component.form.controls['nombre']
    nombre.setValue("Cardano")
    let cantidad = component.form.controls['cantidad']
    cantidad.setValue(4)
    let tipo = component.form.controls['tipo']
    tipo.setValue("compra")
    expect(component.form.invalid).toBeTrue();
  });
});
