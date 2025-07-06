import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
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
import { RouterModule, Routes } from '@angular/router';
import { Grafico } from './pages/graficos/grafico';
const routes: Routes = [
  { path: '', component: Grafico } // Default route for /graficos
];
@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    //Pages
    LoginModule,
    HomeModule,
    GraficoModule,
    //PrimeNG
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    DividerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
