import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarReceitas } from './adicionar-receitas';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconPickerDialogModule } from '../../components/icon-picker-dialog/icon-picker-dialog-module';

@NgModule({
  declarations: [AdicionarReceitas],
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
  exports: [AdicionarReceitas],
})
export class AdicionarReceitasModule {}
