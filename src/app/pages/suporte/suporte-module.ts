import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Suporte } from './suporte';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';
import { TotalsDashboardModule } from '../../components/totals-dashboard/totals-dashboard-module';
import { TransactionsListModule } from '../../components/transactions-list/transactions-list-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [Suporte],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarMenuModule,
    TotalsDashboardModule,
    TransactionsListModule,
    ButtonModule,
  ],
  exports: [Suporte],
})
export class SuporteModule {}
