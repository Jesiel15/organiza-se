import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarDespesas } from './editar-despesas';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconPickerDialogModule } from '../../components/icon-picker-dialog/icon-picker-dialog-module';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
@NgModule({
  declarations: [EditarDespesas],
  imports: [
    CommonModule,
    SidebarMenuModule,
    IconPickerDialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ColorPickerModule,
    ButtonModule,
    DatePickerModule,
  ],
  exports: [EditarDespesas],
})
export class EditarDespesasModule {}
