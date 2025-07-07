import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../service/transactions.service';

@Component({
  selector: 'app-totals-dashboard',
  standalone: false,
  templateUrl: './totals-dashboard.html',
  styleUrl: './totals-dashboard.scss',
})
export class TotalsDashboard implements OnInit {
  totalExpenses = 0;
  totalRevenues = 0;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.totalExpenses$.subscribe((total) => {
      this.totalExpenses = total;
    });

    this.transactionsService.totalRevenues$.subscribe((total) => {
      this.totalRevenues = total;
    });
  }

  get saldo(): number {
    return this.totalRevenues - this.totalExpenses;
  }

  get formattedTotalExpenses(): string {
    if (this.totalExpenses === 0) return '0,00';

    const valorFormatado = this.totalExpenses.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `-${valorFormatado}`;
  }
}
