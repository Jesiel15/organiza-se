import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module'; // Nome corrigido para 'app-routing.module'
import { App } from './app';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Já está aqui
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginModule } from './pages/login/login-module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './pages/home/home-module';
import { DividerModule } from 'primeng/divider';
import { GraficoModule } from './pages/graficos/grafico-module';
import { Routes } from '@angular/router';
import { Grafico } from './pages/graficos/grafico';
import { CadastroModule } from './pages/cadastro/cadastro-module';
import { ColorPickerModule } from 'primeng/colorpicker';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

const routes: Routes = [
  { path: '', component: Grafico }, // Rota padrão, ajuste conforme sua necessidade
];

registerLocaleData(ptBr);
@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, // Seu módulo de rotas principal
    HttpClientModule,
    // Remova RouterModule.forChild(routes) daqui, as rotas principais devem ser em AppRoutingModule.forRoot()
    // RouterModule.forChild(routes), // Geralmente rotas de um módulo específico usam forChild

    // Pages
    LoginModule,
    CadastroModule,
    HomeModule,
    GraficoModule,

    // PrimeNG
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    DividerModule,
    ColorPickerModule,
  ],
  providers: [
    provideAnimationsAsync(), // Isso já habilita o suporte a animações
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [App],
})
export class AppModule {}
