import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private client: LoginService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void { }

  ingresar () {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.client.loginUser({email: email, password: password}).subscribe({
      next: (res: any) => { // Se logea correctamente
        console.log(res)
        this.client.saveToken(res.token,res.expiresIn)
        this.fakeLoading();
        this.msg("Se ha iniciado sesión correctamente")
      },
      error : (e) => { // Error al logearse
        this.msg(e.error);
        this.form.reset();
      }
    })  
  }

  msg(err :string) {
    this._snackBar.open(err,'', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    },1500);
    this.router.navigateByUrl("/home")
  }
}
