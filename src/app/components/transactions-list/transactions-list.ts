import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss',
})
export class TransactionsList implements OnInit {
  expenses: Expense[] = [];
  revenues: Revenue[] = [];

  constructor(private router: Router, private http: HttpClient) {}

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
      .get<Expense[]>('http://localhost:3000/expenses', { headers })
      .subscribe({
        next: (data) => {
          console.warn(data);
          this.expenses = data.map((exp) => ({
            ...exp,
            dateExpense: new Date(exp.dateExpense), // garantir conversão para Date
          }));
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
      .get<Revenue[]>('http://localhost:3000/revenues', { headers })
      .subscribe({
        next: (data) => {
          console.warn(data);
          this.revenues = data.map((exp) => ({
            ...exp,
            dateRevenue: new Date(exp.dateRevenue),
          }));
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
}
