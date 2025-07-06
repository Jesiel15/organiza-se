import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalsDashboard } from './totals-dashboard';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [TotalsDashboard],
  imports: [CommonModule, CardModule],
  exports: [TotalsDashboard],
})
export class TotalsDashboardModule {}
