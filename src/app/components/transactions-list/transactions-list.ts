import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss',
})
export class TransactionsList implements OnInit {
  expenses: Expense[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.expenses = [
      { name: 'Contas', date: new Date('2025-07-20'), amount: -2000.0 },
      { name: 'Contas contas', date: new Date('2025-07-20'), amount: -298.0 },
      { name: 'Outras Contas', date: new Date('2025-07-20'), amount: -20.0 },
      {
        name: 'Contas Diversas',
        date: new Date('2025-07-20'),
        amount: -20000.0,
      },
    ];
  }

  goToAddDespesa() {
    this.router.navigate(['/add-despesa']);
  }

  goToAddReceita() {
    this.router.navigate(['/add-receita']);
  }
}
