import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.html',
  styleUrl: './calendario.scss',
})
export class Calendario implements OnInit {
  calendarOptions: any;
  events: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setCalendarOptions();
    this.fetchTransactions();
  }

  setCalendarOptions() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth',
      },

      locales: allLocales,
      locale: 'pt-br',

      editable: false,
      selectable: false,
      events: this.events,
      displayEventTime: false,

      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
      },
    };
  }

  fetchTransactions() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado.');
      return;
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    forkJoin({
      expenses: this.http.get<any[]>('http://localhost:3000/expenses', {
        headers,
      }),
      revenues: this.http.get<any[]>('http://localhost:3000/revenues', {
        headers,
      }),
    }).subscribe({
      next: (results) => {
        const expenseEvents = results.expenses.map((exp) => ({
          title: exp.nameExpense,
          start: new Date(exp.dateExpense),
          color: '#EF4444',
        }));

        const revenueEvents = results.revenues.map((rev) => ({
          title: rev.nameRevenue,
          start: new Date(rev.dateRevenue),
          color: '#22C55E',
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events: [...expenseEvents, ...revenueEvents],
        };
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
      },
    });
  }
}
