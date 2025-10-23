import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environmentDev } from '../../utils/environment';
import { catchError, take, throwError } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-configuracoes',
  standalone: false,
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.scss',
})
export class Configuracoes implements OnInit {
  userForm: FormGroup;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      nameUser: ['', [Validators.required]],
      emailUser: ['', [Validators.required]],
      passwordUser: ['', Validators.required],
      newPasswordUser: ['', Validators.required],
      confirmPasswordUser: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  onUpdate() {
    if (this.userForm.valid) {
      // this.updateUser();
      console.log('Fomulário válido');
    } else {
      console.error(
        'O formulário não é válido ou os parâmetros de rota estão ausentes.'
      );
    }
  }

  private loadUserData() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.currentUser = this.authService.getLoggedInUser();

    if (this.currentUser) {
      console.log('Configuração Usuário logado: ', this.currentUser);
      this.userForm.get('nameUser')?.setValue(this.currentUser.name);
      this.userForm.get('emailUser')?.setValue(this.currentUser.email);
    } else {
      console.log('Nenhum usuário logado ou token inválido.');
    }
  }
}
