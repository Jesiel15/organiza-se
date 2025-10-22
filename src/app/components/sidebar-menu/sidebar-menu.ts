import { Component, OnInit } from '@angular/core'; // Adicionado OnInit
import { Router, NavigationEnd } from '@angular/router'; // Adicionado NavigationEnd
import { filter } from 'rxjs/operators'; // Necessário para filtrar eventos do router

@Component({
  selector: 'app-sidebar-menu',
  standalone: false,
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu implements OnInit {
  activeRoute: string = '';

  constructor(private router: Router) {}

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
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  navegar(route: string) {
    this.router.navigate([route]);
  }
}
