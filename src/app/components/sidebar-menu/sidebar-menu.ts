import { Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
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
  isDarkMode: boolean = false;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.loadTheme();
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

  private loadTheme(): void {
    // Tenta obter o estado do tema do armazenamento local. Padrão é 'false' (light)
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme === 'dark';

    // Aplica a classe imediatamente
    this.applyTheme(this.isDarkMode);
  }

  // C. Novo Método: Altera o estado do tema
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode; // Inverte o estado

    this.applyTheme(this.isDarkMode);

    // Salva a preferência no Local Storage
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  // D. Novo Método: Aplica a classe ao body
  private applyTheme(isDark: boolean): void {
    const body = this.document.body; // Pega o elemento body
    if (isDark) {
      this.renderer.addClass(body, 'dark-mode');
    } else {
      this.renderer.removeClass(body, 'dark-mode');
    }
  }
}
