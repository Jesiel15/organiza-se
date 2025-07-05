import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    const token = localStorage.getItem('token');

    if (token) {
      this.http
        .post(
          'http://localhost:3000/api/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .subscribe({
          next: () => {
            localStorage.removeItem('token'); // remove o token
            this.router.navigate(['/login']); // redireciona para a tela de login
          },
          error: (err) => {
            console.error('Erro ao fazer logout:', err);
            // Mesmo com erro, remove o token localmente por segurança
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          },
        });
    } else {
      // Se não tem token, apenas navega para login
      this.router.navigate(['/login']);
    }
  }
}
