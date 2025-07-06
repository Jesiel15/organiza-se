import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms'; // Import AbstractControl and ValidatorFn
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Cadastro {
  cadastroForm: FormGroup;
  showError = '';
  valueSenha!: string;
  valueConfirmarSenha!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.emailMatchValidator, this.passwordMatchValidator],
      }
    );
  }

  emailMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const email = control.get('email');
    const confirmEmail = control.get('confirmEmail');

    if (!email || !confirmEmail) {
      return null;
    }

    return email.value === confirmEmail.value ? null : { emailMismatch: true };
  };

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };

  goToLogin() {
    this.router.navigate(['/login']); // navega para a home
  }

  onSubmit() {
    this.showError = '';

    if (this.cadastroForm.invalid) {
      if (this.cadastroForm.errors?.['emailMismatch']) {
        this.showError = 'Os emails digitados não coincidem.';
      } else if (this.cadastroForm.errors?.['passwordMismatch']) {
        this.showError = 'As senhas digitadas não coincidem.';
      } else {
        this.showError = 'Por favor, preencha todos os campos corretamente.';
      }
      return;
    }

    this.http
      .post<any>(
        'http://localhost:3000/api/auth/register',
        this.cadastroForm.value
      )
      .subscribe({
        next: (res) => {
          alert('Cadastro realizado com sucesso!');
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.showError = err.error.message || 'Erro ao fazer cadastro';
        },
      });
  }
}
