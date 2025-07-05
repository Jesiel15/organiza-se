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
import { LoginModule } from "./pages/login/login-module";
import { Login } from './pages/login/login';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    //Pages
    LoginModule,
    //PrimeNG
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
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
