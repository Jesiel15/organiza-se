// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  currentUser: any; // Ou defina uma interface mais específica para o usuário

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.currentUser = this.authService.getLoggedInUser();
    if (this.currentUser) {
      console.log('Usuário logado:', this.currentUser.name);
      // Você pode usar this.currentUser no seu template agora
    } else {
      console.log('Nenhum usuário logado ou token inválido.');
    }
  }
}
