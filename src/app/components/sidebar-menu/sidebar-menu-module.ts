import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenu } from './sidebar-menu';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [SidebarMenu],
  imports: [CommonModule, DividerModule],
  exports: [SidebarMenu],
})
export class SidebarMenuModule {}
