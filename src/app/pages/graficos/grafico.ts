import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environmentDev } from '../../utils/environment';

@Component({
  selector: 'app-grafico',
  standalone: false,
  templateUrl: './grafico.html',
  styleUrls: ['./grafico.scss'],
})
export class Grafico implements OnInit {
  data: any;
  options: any;
  yearFilter: Date | null = new Date();

  allExpenses: any[] = [];
  allRevenues: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    forkJoin({
      expenses: this.http.get<any[]>(`${environmentDev.apiUrl}/expenses`, {
        headers,
      }),
      revenues: this.http.get<any[]>(`${environmentDev.apiUrl}/revenues`, {
        headers,
      }),
    }).subscribe({
      next: (results) => {
        this.allExpenses = results.expenses.map((exp) => ({
          ...exp,
          id: exp.id || exp._id,
          dateExpense: new Date(exp.dateExpense),
        }));
        this.allRevenues = results.revenues.map((rev) => ({
          ...rev,
          id: rev.id || rev._id,
          dateRevenue: new Date(rev.dateRevenue),
        }));

        this.applyFilter(); // Aplica o filtro após ambas as listas estarem completas
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
      },
    });
  }

  applyFilter() {
    if (!this.yearFilter) {
      return;
    }

    const selectedYear = this.yearFilter.getFullYear();
    const meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    const despesasMensais = new Array(12).fill(0);
    const receitasMensais = new Array(12).fill(0);
    const sobraFaltaMensais = new Array(12).fill(0);

    this.allExpenses
      .filter(
        (expense) =>
          new Date(expense.dateExpense).getFullYear() === selectedYear
      )
      .forEach((expense) => {
        const month = new Date(expense.dateExpense).getMonth();
        despesasMensais[month] += expense.valueExpense;
      });

    this.allRevenues
      .filter(
        (revenue) =>
          new Date(revenue.dateRevenue).getFullYear() === selectedYear
      )
      .forEach((revenue) => {
        const month = new Date(revenue.dateRevenue).getMonth();
        receitasMensais[month] += revenue.valueRevenue;
      });

    for (let i = 0; i < 12; i++) {
      sobraFaltaMensais[i] = receitasMensais[i] - despesasMensais[i];
    }

    this.data = {
      labels: meses,
      datasets: [
        {
          label: 'Despesas Anuais (R$)',
          backgroundColor: '#EF4444',
          borderColor: '#EF4444',
          data: despesasMensais,
        },
        {
          label: 'Receitas Anuais (R$)',
          backgroundColor: '#22C55E',
          borderColor: '#22C55E',
          data: receitasMensais,
        },
        {
          label: 'Total sobra/falta (R$)',
          backgroundColor: '#03488d',
          borderColor: '#03488d',
          data: sobraFaltaMensais,
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: { color: '#495057' },
          grid: { color: '#ebedef' },
        },
        y: {
          ticks: { color: '#495057' },
          grid: { color: '#ebedef' },
        },
      },
    };
  }

  onFilterChange() {
    this.applyFilter();
  }
}
