import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarReceitas } from './adicionar-receitas';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';

@NgModule({
  declarations: [AdicionarReceitas],
  imports: [CommonModule, SidebarMenuModule],
  exports: [AdicionarReceitas],
})
export class AdicionarReceitasModule {}
