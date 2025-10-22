import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendario } from './calendario';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';

@NgModule({
  declarations: [Calendario],
  imports: [CommonModule, FullCalendarModule, SidebarMenuModule],
  exports: [Calendario],
})
export class CalendarioModule {}
