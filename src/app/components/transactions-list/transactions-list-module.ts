import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsList } from './transactions-list';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransactionsList],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    RippleModule,
    ConfirmDialogModule,
    DatePickerModule,
    FormsModule,
  ],
  exports: [TransactionsList],
})
export class TransactionsListModule {}
