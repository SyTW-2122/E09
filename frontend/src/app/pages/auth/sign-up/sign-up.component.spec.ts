import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [ReactiveFormsModule, MatSnackBarModule, HttpClientModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Se puede registrar un usuario', () => {
    let nombre = component.form.controls['username']
    nombre.setValue("Paco")
    let email = component.form.controls['email']
    email.setValue("Paco@gmail.com")
    let password = component.form.controls['password']
    password.setValue("PacoSecretPassword")
    let password2 = component.form.controls['password2']
    password2.setValue("PacoSecretPassword")
    expect(component.form.invalid).toBeFalse();
  });
});
