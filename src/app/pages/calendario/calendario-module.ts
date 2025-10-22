import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendario } from './calendario';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Calendario],
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    SidebarMenuModule,
    DatePickerModule,
  ],
  exports: [Calendario],
})
export class CalendarioModule {}
