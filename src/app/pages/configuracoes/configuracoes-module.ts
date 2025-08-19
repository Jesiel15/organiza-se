import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Configuracoes } from './configuracoes';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';

@NgModule({
  declarations: [Configuracoes],
  imports: [CommonModule, SidebarMenuModule],
  exports: [Configuracoes],
})
export class ConfiguracoesModule {}
