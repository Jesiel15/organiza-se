import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Configuracoes } from './configuracoes';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [Configuracoes],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarMenuModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [Configuracoes],
})
export class ConfiguracoesModule {}
