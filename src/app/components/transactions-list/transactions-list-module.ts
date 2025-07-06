import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsList } from './transactions-list';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TransactionsList],
  imports: [CommonModule, CardModule, ButtonModule, DialogModule, RippleModule],
  exports: [TransactionsList],
})
export class TransactionsListModule {}
