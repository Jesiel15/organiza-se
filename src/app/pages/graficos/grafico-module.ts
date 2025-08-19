import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grafico } from './grafico';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';
import { ChartModule } from 'primeng/chart';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Grafico],
  imports: [
    CommonModule,
    FormsModule,
    SidebarMenuModule,
    ChartModule,
    DatePicker,
  ],
  exports: [Grafico],
})
export class GraficoModule {}
