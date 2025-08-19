import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Login {
  loginForm: FormGroup;
  showError = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  goToCadastro() {
    this.router.navigate(['/cadastro']); // navega para a home
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.http
      .post<any>('http://localhost:3000/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          // alert('Login realizado com sucesso!');
          // console.log("#### resp login:",res)
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']); // navega para a home
        },
        error: (err) => {
          this.showError = err.error.message || 'Erro ao fazer login';
        },
      });
  }
}
