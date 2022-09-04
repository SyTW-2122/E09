import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [ReactiveFormsModule, MatSnackBarModule, HttpClientModule, RouterTestingModule.withRoutes([])]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Se puede logear exitosamente', () => {
    let email = component.form.controls['email']
    email.setValue("andres")
    let password = component.form.controls['password']
    password.setValue("andres")
    expect(component.form.invalid).toBeFalse();
  });
  it('El logeo no es exitoso si no se especifica una contraseña', () => {
    let email = component.form.controls['email']
    email.setValue("andres")
    expect(component.form.invalid).toBeTrue();
  });
});
