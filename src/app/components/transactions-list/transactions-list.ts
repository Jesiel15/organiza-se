import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransactionsService } from '../../service/transactions.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.html',
  styleUrls: ['./transactions-list.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TransactionsList implements OnInit {
  expenses: Expense[] = [];
  revenues: Revenue[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private transactionsService: TransactionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
    const dateObj = new Date(expense.dateExpense);
    const monthYear = `${String(dateObj.getMonth() + 1).padStart(
      2,
      '0'
    )}${dateObj.getFullYear()}`;

    this.router.navigate(['/editar-despesa', monthYear, expense.id]);
  }

  goToEditReceita(revenue: Revenue) {
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const monthYear = this.getMonthYearKey(new Date(expense.dateExpense));

    this.http
      .delete(`http://localhost:3000/expenses/${monthYear}/${expense.id}`, {
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const monthYear = this.getMonthYearKey(new Date(revenue.dateRevenue));

    this.http
      .delete(`http://localhost:3000/revenues/${monthYear}/${revenue.id}`, {
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

  openModalExluirDespesa(expense: Expense) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a despesa: <br> <br> <strong>${expense.nameExpense}</strong>?`,
      header: 'Excluir despesa',
      // icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar?',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.deleteExpense(expense);
      },
    });
  }

  openModalExluirReceita(revenue: Revenue) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a receita: <br> <br> <strong>${revenue.nameRevenue}</strong>?`,
      header: 'Excluir receita',
      // icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar?',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.deleteRevenue(revenue);
      },
    });
  }
}
