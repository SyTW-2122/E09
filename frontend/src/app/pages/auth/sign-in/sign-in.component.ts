import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private client: LoginService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void { 
    /*let body: Object = {
      "username": "Andres",
      "password": "qwerty"
    }
    this.loginService.getUser(body).subscribe(
      res => console.log(res),
      err => console.log(err)
    )*/
  }

  ingresar () {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.client.loginUser({username: email, password: password}).subscribe({
      next: (res) => { // Se logea correctamente
        console.log(res)
        this.fakeLoading();
      },
      error : (e) => { // Error al logearse
        console.log(e)
        this.error();
        this.form.reset();
      }
    })  
  }

  error() {
    this._snackBar.open('Usuario o contraseña no son válidos','', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      // Se redirecciona al dashboard
      this.loading = false;
    },1500);
  }
}
