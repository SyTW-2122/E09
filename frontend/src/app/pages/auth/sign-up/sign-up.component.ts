import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private client: RegisterService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    })
   }

  ngOnInit(): void { }

  registrar () {
    const username = this.form.value.username;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const password2= this.form.value.password2;
    if (password != password2) {
      this.form.reset();
      this.msg("Las contraseñas deben de ser iguales");
      return
    }

    this.client.registerUser({username: username,email:email, password: password}).subscribe({
      next: (res: any) => { // Se registra correctamente
        this.form.reset()
        this.msg(res)
        this.router.navigateByUrl('/sign-in')
      },
      error : (e) => { // Error al registrarse
        this.msg(e.error);
        this.form.reset();
      }
    })  
  }
  msg(err: string) {
    this._snackBar.open(err,'', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
