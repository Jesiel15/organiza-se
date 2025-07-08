import { NgModule } from '@angular/core';
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
import { RouterModule, Routes } from '@angular/router'; // RouterModule já importado
import { Grafico } from './pages/graficos/grafico'; // Se 'Grafico' for um componente para a rota padrão
import { CadastroModule } from './pages/cadastro/cadastro-module';
import { ColorPickerModule } from 'primeng/colorpicker';

// As rotas deveriam estar no app-routing.module.ts.
// Para propósitos de demonstração, se fosse aqui, estaria assim:
const routes: Routes = [
  { path: '', component: Grafico }, // Rota padrão, ajuste conforme sua necessidade
];

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
  ],
  bootstrap: [App],
})
export class AppModule {}
