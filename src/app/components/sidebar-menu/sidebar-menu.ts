import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  standalone: false,
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  constructor(private router: Router) {}

  menuItems: { label: string; icon: string; route: string; class?: string }[] =
    [
      { label: 'Início', icon: 'pi pi-home', route: '/home' },
      { label: 'Gráficos', icon: 'pi pi-chart-bar', route: '/graficos' },
      { label: 'Calendário', icon: 'pi pi-calendar', route: '/calendario' },
      { label: 'Configurações', icon: 'pi pi-cog', route: '/configuracoes' },
      {
        label: 'Sair',
        icon: 'pi pi-exclamation-triangle',
        route: '/login',
        class: 'menu-item sair'
      },
    ];

  sair() {
    this.router.navigate(['/login']);
  }

  navegar(route: string) {
    this.router.navigate([route]);
  }
}