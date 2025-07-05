import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
  encapsulation: ViewEncapsulation.None 
})
export class Login {
  loginForm: FormGroup;
  showError = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.http
      .post<any>('http://localhost:3000/api/auth/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          alert('Login realizado com sucesso!');
        },
        error: (err) => {
          this.showError = err.error.message || 'Erro ao fazer login';
        },
      });
  }
}
