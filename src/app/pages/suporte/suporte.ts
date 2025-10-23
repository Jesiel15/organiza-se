import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environmentDev } from '../../utils/environment';

@Component({
  selector: 'app-suporte',
  standalone: false,
  templateUrl: './suporte.html',
  styleUrl: './suporte.scss',
})
export class Suporte implements OnInit {
  currentUser: any;
  emailForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.emailForm = this.fb.group({
      nameUser: ['', [Validators.required]],
      emailUser: ['', Validators.required],
      messageUser: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getLoggedInUser();
    if (this.currentUser) {
      console.log('Usuário logado:', this.currentUser.name);
    } else {
      console.log('Nenhum usuário logado ou token inválido.');
    }
  }

  onUpdate() {
    const token = localStorage.getItem('token');

    this.http
      .post(
        `${environmentDev.apiUrl}/support/email`,
        {
          name: this.emailForm.get('nameUser')?.value,
          email: this.emailForm.get('emailUser')?.value,
          message: this.emailForm.get('messageUser')?.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .subscribe({
        next: () => {
          alert('Mensagem enviada com sucesso!');
        },
        error: (err) =>
          alert(`Erro: ${err.error?.msg || 'Falha ao enviar mensagem'}`),
      });
  }
}
