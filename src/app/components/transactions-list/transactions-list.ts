// transactions-list.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransactionsService } from '../../service/transactions.service';

interface Expense {
  id: string;
  nameExpense: string;
  valueExpense: number;
  dateExpense: Date;
  icon: string;
  color: string;
  anotation: string;
}

interface Revenue {
  id: string;
  nameRevenue: string;
  valueRevenue: number;
  dateRevenue: Date;
  icon: string;
  color: string;
  anotation: string;
}

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss',
})
export class TransactionsList implements OnInit {
  expenses: Expense[] = [];
  revenues: Revenue[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.fetchExpenses();
    this.fetchRevenues();
  }

  fetchExpenses() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado.');
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get<any[]>('http://localhost:3000/expenses', { headers })
      .subscribe({
        next: (data) => {
          this.expenses = data.map((exp) => ({
            ...exp,
            id: exp.id || exp._id, // Garante que o ID seja mapeado
            dateExpense: new Date(exp.dateExpense),
          }));
          const total = this.expenses.reduce(
            (acc, exp) => acc + exp.valueExpense,
            0
          );
          this.transactionsService.setTotalExpenses(total);
        },
        error: (err) => {
          console.error('Erro ao buscar despesas:', err);
        },
      });
  }

  fetchRevenues() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado.');
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get<any[]>('http://localhost:3000/revenues', { headers })
      .subscribe({
        next: (data) => {
          this.revenues = data.map((exp) => ({
            ...exp,
            id: exp.id || exp._id, // Garante que o ID seja mapeado
            dateRevenue: new Date(exp.dateRevenue),
          }));
          const total = this.revenues.reduce(
            (acc, rev) => acc + rev.valueRevenue,
            0
          );
          this.transactionsService.setTotalRevenues(total);
        },
        error: (err) => {
          console.error('Erro ao buscar receitas:', err);
        },
      });
  }

  goToAddDespesa() {
    this.router.navigate(['/add-despesa']);
  }

  goToAddReceita() {
    this.router.navigate(['/add-receita']);
  }

  goToEditDespesa(expense: Expense) {
    console.log(expense);
    console.log('expense. id>: ', expense.id);
    this.router.navigate(['/editar-despesa', expense.id]);
  }

  goToEditReceita(revenue: Revenue) {
    this.router.navigate(['/editar-receita', revenue.id]);
  }

  openModalExluirDespesa(expense: Expense) {
    console.log('Modal excluir Despesa ', expense);
  }

  openModalExluirReceita(revenue: Revenue) {
    console.log('Modal excluir Receita ', revenue);
  }
}
