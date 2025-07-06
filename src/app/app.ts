// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importar RouterOutlet
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations'; // Importar as funções de animação

@Component({
  selector: 'app-root',
  templateUrl: './app.html', // O template deve conter o <router-outlet>
  standalone: false,
  styleUrl: './app.scss',
  animations: [
    // Definição das animações
    trigger('routeAnimations', [
      // Transição de Fade (Genérica para qualquer mudança de rota)
      // transition('* <=> *', [
      //   style({ position: 'relative' }),
      //   query(
      //     ':enter, :leave',
      //     [
      //       style({
      //         position: 'absolute',
      //         top: 0,
      //         left: 0,
      //         width: '100%',
      //       }),
      //     ],
      //     { optional: true }
      //   ),
      //   query(':enter', [style({ opacity: 0 })], { optional: true }),
      //   group([
      //     query(':leave', [animate('500ms ease-out', style({ opacity: 0 }))], {
      //       optional: true,
      //     }),
      //     query(':enter', [animate('500ms ease-in', style({ opacity: 1 }))], {
      //       optional: true,
      //     }),
      //   ]),
      // ]),

      transition('Cadastro => Login', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%' })]), // Novo componente entra pela direita
        group([
          query(':leave', [
            animate('500ms ease-out', style({ left: '-100%' })),
          ]), // Componente antigo sai para a esquerda
          query(':enter', [animate('500ms ease-in', style({ left: '0%' }))]), // Novo componente desliza para o centro
        ]),
      ]),
      // Exemplo de transição Slide: Cadastro para Login
      transition('Login => Cadastro', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '-100%' })]), // Novo componente entra pela esquerda
        group([
          query(':leave', [animate('500ms ease-out', style({ left: '100%' }))]), // Componente antigo sai para a direita
          query(':enter', [animate('500ms ease-in', style({ left: '0%' }))]), // Novo componente desliza para o centro
        ]),
      ]),

      // Exemplo de transição Slide: Login para Cadastro
      // Você pode usar este ou o fade genérico acima.
      // Se usar ambos, a ordem importa, ou você pode fazer transições mais específicas.
      /*
      transition('Login => Cadastro', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%' })]), // Novo componente entra pela direita
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '-100%' }))]), // Componente antigo sai para a esquerda
          query(':enter', [animate('300ms ease-in', style({ left: '0%' }))]), // Novo componente desliza para o centro
        ]),
      ]),
      // Exemplo de transição Slide: Cadastro para Login
      transition('Cadastro => Login', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '-100%' })]), // Novo componente entra pela esquerda
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]), // Componente antigo sai para a direita
          query(':enter', [animate('300ms ease-in', style({ left: '0%' }))]), // Novo componente desliza para o centro
        ]),
      ]),
      */
    ]),
  ],
})
export class App {
  protected title = 'organiza-se';

  // Função para pegar o valor da propriedade 'animation' do RouterOutlet
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
