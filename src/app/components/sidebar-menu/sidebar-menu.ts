import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-menu',
  standalone: false,
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  providers: [ConfirmationService],
})
export class SidebarMenu implements OnInit {
  activeRoute: string = '';

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.updateActiveRoute(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveRoute(event.urlAfterRedirects);
      });
  }

  updateActiveRoute(url: string): void {
    const urlSegments = url.split('?')[0];
    this.activeRoute = urlSegments;
  }

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
        class: 'menu-item sair',
      },
    ];

  sair() {
    this.openModalConfirmarLogout();
  }

  openModalConfirmarLogout() {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja sair?`,
      header: 'Deseja sair',
      acceptLabel: 'Sair?',
      rejectLabel: 'Cancelar',
      accept: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
    });
  }

  navegar(route: string) {
    this.router.navigate([route]);
  }

  navigateToSupport() {
    this.router.navigate(['/suporte']);
  }
}
