import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconPickerDialog } from '../../components/icon-picker-dialog/icon-picker-dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-adicionar-despesas',
  standalone: false,
  templateUrl: './adicionar-despesas.html',
  styleUrl: './adicionar-despesas.scss',
})
export class AdicionarDespesas {
  expenseForm: FormGroup;
  // valor: number = 151351;

  @ViewChild(IconPickerDialog)
  iconPickerDialog!: IconPickerDialog;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      icon: ['pi pi-credit-card'],
      color: ['#ff0000'],
      nameExpense: ['', [Validators.required]],
      valueExpense: ['', Validators.required],
      dateExpense: ['', Validators.required],
      anotation: ['', Validators.required],
    });
  }

  openIconPicker() {
    this.iconPickerDialog.show();
  }

  onIconSelected(icon: string) {
    this.expenseForm.get('icon')?.setValue('pi ' + icon);
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      this.saveExpense();
    } else {
      console.error('O formulário não é válido.');
    }
  }

  private saveExpense() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error(
        'Token de autenticação não encontrado. Redirecionando para o login.'
      );
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const newExpense = this.expenseForm.value;

    this.http
      .post('http://localhost:3000/expenses', newExpense, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao adicionar despesa:', error);
          if (error.status === 401 || error.status === 403) {
            console.warn(
              'Sessão expirada ou token inválido. Redirecionando para o login.'
            );
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Erro ao salvar despesa'));
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Despesa adicionada com sucesso!', response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(
            'Falha na requisição. Verifique o console para mais detalhes.'
          );
        },
      });
  }

  getIconColor(hexColor: string | null | undefined): string {
    if (!hexColor) {
      return 'black';
    }

    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? 'black' : 'white';
  }

  formatCurrency(inputElement: any) {
    let value = inputElement.value;

    value = value.replace(/[^0-9]/g, '');

    let numericValue = parseInt(value, 10) / 100;
    if (isNaN(numericValue)) {
      numericValue = 0;
    }

    this.expenseForm
      .get('valueExpense')
      ?.setValue(numericValue, { emitEvent: false });

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(numericValue);

    inputElement.value = formattedValue;
  }
}
