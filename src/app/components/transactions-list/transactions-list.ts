import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransactionsService } from '../../service/transactions.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environmentDev } from '../../utils/environment';

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.html',
  styleUrls: ['./transactions-list.scss'],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class TransactionsList implements OnInit {
  expenses: Expense[] = [];
  revenues: Revenue[] = [];
  allExpenses: Expense[] = [];
  allRevenues: Revenue[] = [];
  isLoading: boolean = false;
  monthYearFilter: Date = new Date();

  constructor(
    private router: Router,
    private http: HttpClient,
    private transactionsService: TransactionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const savedFilter = localStorage.getItem('transactionsFilter');
    const today = new Date();
    let initialDate = new Date(today.getFullYear(), today.getMonth(), 1);

    if (savedFilter) {
      const month = parseInt(savedFilter.substring(0, 2)) - 1; // Mês (0-11)
      const year = parseInt(savedFilter.substring(2, 6)); // Ano

      initialDate = new Date(year, month, 1);

      // Remova o filtro para não carregar eternamente
      localStorage.removeItem('transactionsFilter');
    }

    this.monthYearFilter = initialDate;

    this.fetchTransactions();
  }

  fetchTransactions() {
    this.fetchExpenses();
    this.fetchRevenues();
  }

  fetchExpenses() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http
      .get<any>(`${environmentDev.apiUrl}/expenses`, { headers })
      .subscribe({
        next: (response) => {
          // Acessa a propriedade .data do objeto retornado pela API
          const expensesArray = response.data || [];

          this.allExpenses = expensesArray.map((exp: any) => ({
            ...exp,
            id: exp.id || exp._id,
            dateExpense: new Date(exp.dateExpense),
            isPaid: exp.isPaid || false,
          }));

          this.applyFilter();
        },
        error: (err) => {
          console.error('Erro ao buscar despesas:', err);
        },
      });
  }

  toggleExpensePaidStatus(expense: Expense) {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado.');
      this.isLoading = false;
      expense.isPaid = !expense.isPaid;
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const monthYear = this.getMonthYearKey(new Date(expense.dateExpense));
    const url = `${environmentDev.apiUrl}/expenses/${monthYear}/${expense.id}`;

    const payload = { isPaid: expense.isPaid };

    this.http
      .patch(url, payload, { headers })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Status da despesa "${expense.nameExpense}" atualizado!`,
          });
        },
        error: (err) => {
          expense.isPaid = !expense.isPaid;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar status da despesa.',
          });
          console.error('Erro ao atualizar status:', err);
        },
      });
  }

  fetchRevenues() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http
      .get<any>(`${environmentDev.apiUrl}/revenues`, { headers })
      .subscribe({
        next: (response) => {
          const revenuesArray = response.data || [];
          this.allRevenues = revenuesArray.map((exp: any) => ({
            ...exp,
            id: exp.id || exp._id,
            dateRevenue: new Date(exp.dateRevenue),
          }));
          this.applyFilter();
        },
        error: (err) => {
          console.error('Erro ao buscar receitas:', err);
        },
      });
  }

  onFilterChange() {
    this.applyFilter();
  }

  applyFilter() {
    const selectedDate = this.monthYearFilter;
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    // Filtra as despesas
    this.expenses = this.allExpenses.filter((expense) => {
      const expenseDate = new Date(expense.dateExpense);
      return (
        expenseDate.getMonth() === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      );
    });

    // Filtra as receitas
    this.revenues = this.allRevenues.filter((revenue) => {
      const revenueDate = new Date(revenue.dateRevenue);
      return (
        revenueDate.getMonth() === selectedMonth &&
        revenueDate.getFullYear() === selectedYear
      );
    });

    // Recalcula os totais
    const totalExpenses = this.expenses.reduce(
      (acc, exp) => acc + exp.valueExpense,
      0
    );
    this.transactionsService.setTotalExpenses(totalExpenses);

    const totalRevenues = this.revenues.reduce(
      (acc, rev) => acc + rev.valueRevenue,
      0
    );
    this.transactionsService.setTotalRevenues(totalRevenues);
  }
  saveFilterState() {
    const monthYearKey = this.getMonthYearKey(this.monthYearFilter);
    localStorage.setItem('transactionsFilter', monthYearKey);
  }

  goToAddDespesa() {
    this.saveFilterState();
    this.router.navigate(['/add-despesa']);
  }

  goToAddReceita() {
    this.saveFilterState();
    this.router.navigate(['/add-receita']);
  }

  goToEditDespesa(expense: Expense) {
    this.saveFilterState();

    const dateObj = new Date(expense.dateExpense);
    const monthYear = `${String(dateObj.getMonth() + 1).padStart(
      2,
      '0'
    )}${dateObj.getFullYear()}`;
    this.router.navigate(['/editar-despesa', monthYear, expense.id]);
  }

  goToEditReceita(revenue: Revenue) {
    this.saveFilterState();

    const dateObj = new Date(revenue.dateRevenue);
    const monthYear = `${String(dateObj.getMonth() + 1).padStart(
      2,
      '0'
    )}${dateObj.getFullYear()}`;
    this.router.navigate(['/editar-receita', monthYear, revenue.id]);
  }

  getMonthYearKey(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}${year}`;
  }

  deleteExpense(expense: Expense) {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const monthYear = this.getMonthYearKey(new Date(expense.dateExpense));

    this.http
      .delete(`${environmentDev.apiUrl}/expenses/${monthYear}/${expense.id}`, {
        headers,
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Despesa excluída com sucesso!',
          });
          this.fetchExpenses();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir a despesa.',
          });
          console.error('Erro ao excluir despesa:', err);
        },
      });
  }

  deleteRevenue(revenue: Revenue) {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const monthYear = this.getMonthYearKey(new Date(revenue.dateRevenue));

    this.http
      .delete(`${environmentDev.apiUrl}/revenues/${monthYear}/${revenue.id}`, {
        headers,
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Receita excluída com sucesso!',
          });
          this.fetchRevenues();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir a receita.',
          });
          console.error('Erro ao excluir receita:', err);
        },
      });
  }

  replicarExpense(expense: Expense) {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const monthYear = this.getMonthYearKey(new Date(expense.dateExpense));

    // A lógica de replicar geralmente envia os dados para uma rota que cria
    // uma cópia no mês seguinte.

    this.http
      .post(
        `${environmentDev.apiUrl}/expenses/${monthYear}/${expense.id}/replicate`,
        {},
        { headers }
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Despesa replicada para o próximo mês!',
          });
          this.fetchExpenses();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao replicar a despesa.',
          });
          console.error('Erro ao replicar despesa:', err);
        },
      });
  }

  replicarRevenue(revenue: Revenue) {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const monthYear = this.getMonthYearKey(new Date(revenue.dateRevenue));

    this.http
      .post(
        `${environmentDev.apiUrl}/revenues/${monthYear}/${revenue.id}/replicate`,
        {},
        { headers }
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Receita replicada para o próximo mês!',
          });
          this.fetchRevenues();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao replicar a receita.',
          });
          console.error('Erro ao replicar receita:', err);
        },
      });
  }

  openModalExluirDespesa(expense: Expense) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a despesa: <br> <br> <strong>"${expense.nameExpense}"</strong>?`,
      header: 'Excluir despesa',
      acceptLabel: 'Confirmar?',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.deleteExpense(expense);
      },
    });
  }

  openModalExluirReceita(revenue: Revenue) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a receita: <br> <br> <strong>"${revenue.nameRevenue}"</strong>?`,
      header: 'Excluir receita',
      acceptLabel: 'Confirmar?',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.deleteRevenue(revenue);
      },
    });
  }

  openModalReplicarDespesa(expense: Expense) {
    this.confirmationService.confirm({
      message: `Deseja replicar a despesa para o próximo mês: <br> <br> <strong>"${expense.nameExpense}"</strong>?`,
      header: 'Replicar despesa',
      acceptLabel: 'Confirmar?',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.replicarExpense(expense);
      },
    });
  }

  openModalReplicarReceita(revenue: Revenue) {
    this.confirmationService.confirm({
      message: `Deseja replicar a receita para o próximo mês: <br> <br> <strong>"${revenue.nameRevenue}"</strong>?`,
      header: 'Replicar receita',
      acceptLabel: 'Confirmar?',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.replicarRevenue(revenue);
      },
    });
  }

  toTooltip(valueExpense: number): string {
    if (valueExpense == null) return '';

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valueExpense);

    return `R$ ${formattedValue}`;
  }
}
