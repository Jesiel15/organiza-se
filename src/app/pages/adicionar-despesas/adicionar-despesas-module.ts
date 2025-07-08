import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarDespesas } from './adicionar-despesas';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconPickerDialogModule } from '../../components/icon-picker-dialog/icon-picker-dialog-module';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  declarations: [AdicionarDespesas],
  imports: [
    CommonModule,
    SidebarMenuModule,
    IconPickerDialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ColorPickerModule,
  ],
  exports: [AdicionarDespesas],
})
export class AdicionarDespesasModule {}
