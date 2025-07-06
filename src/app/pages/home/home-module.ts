import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home';
import { SidebarMenuModule } from '../../components/sidebar-menu/sidebar-menu-module';
import { TotalsDashboardModule } from '../../components/totals-dashboard/totals-dashboard-module';
import { TransactionsListModule } from '../../components/transactions-list/transactions-list-module';

@NgModule({
  declarations: [Home],
  imports: [
    CommonModule,
    SidebarMenuModule,
    TotalsDashboardModule,
    TransactionsListModule,
  ],
  exports: [Home],
})
export class HomeModule {}
