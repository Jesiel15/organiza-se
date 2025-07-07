import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarDespesas } from './adicionar-despesas';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';

@NgModule({
  declarations: [AdicionarDespesas],
  imports: [CommonModule, SidebarMenuModule],
  exports: [AdicionarDespesas],
})
export class AdicionarDespesasModule {}
