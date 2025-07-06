import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grafico } from './grafico';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';

@NgModule({
  declarations: [Grafico],
  imports: [CommonModule, SidebarMenuModule],
  exports: [Grafico],
})
export class GraficoModule {}
