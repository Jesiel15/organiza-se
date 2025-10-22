import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenu } from './sidebar-menu';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [SidebarMenu],
  imports: [CommonModule, DividerModule, ConfirmDialogModule],
  exports: [SidebarMenu],
})
export class SidebarMenuModule {}
