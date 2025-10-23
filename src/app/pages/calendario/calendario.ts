import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import { DatePipe } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { environmentDev } from '../../utils/environment';

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.html',
  styleUrl: './calendario.scss',
  providers: [DatePipe],
})
export class Calendario implements OnInit {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: any;
  events: any[] = [];
  monthYearFilter: Date = new Date();

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit() {
    const today = new Date();

    this.monthYearFilter = new Date(today.getFullYear(), today.getMonth(), 1);
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

      datesSet: (dateInfo: any) => {
        this.monthYearFilter = dateInfo.view.calendar.getDate();
      },
    };
  }

  onFilterChange() {
    if (this.monthYearFilter && this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      if (calendarApi) {
        calendarApi.gotoDate(this.monthYearFilter);
      }
    }
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

        this.events = [...expenseEvents, ...revenueEvents];

        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.events,
        };
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
      },
    });
  }
}
