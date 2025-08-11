import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // Importe ActivatedRoute
import { IconPickerDialog } from '../../components/icon-picker-dialog/icon-picker-dialog';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-editar-receitas',
  standalone: false,
  templateUrl: './editar-receitas.html',
  styleUrl: './editar-receitas.scss',
})
export class EditarReceitas implements OnInit {
  revenueForm: FormGroup;
  revenueId: string | null = null; // Propriedade para armazenar o ID

  @ViewChild(IconPickerDialog)
  iconPickerDialog!: IconPickerDialog;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute // Injetar ActivatedRoute
  ) {
    this.revenueForm = this.fb.group({
      icon: ['pi pi-credit-card'],
      color: ['#ff0000'],
      nameRevenue: ['', [Validators.required]],
      valueRevenue: ['', Validators.required],
      dateRevenue: ['', Validators.required],
      anotation: [''],
    });
  }

  ngOnInit(): void {
    this.revenueId = this.route.snapshot.paramMap.get('id');
    if (this.revenueId) {
      this.loadRevenueData();
    } else {
      console.error('ID da receita não encontrado na rota.');
      this.router.navigate(['/home']);
    }
  }

  // Método para carregar os dados da receita existente
  private loadRevenueData() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get(`http://localhost:3000/revenues/${this.revenueId}`, { headers })
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao carregar receita:', error);
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Erro ao carregar receita'));
        })
      )
      .subscribe({
        next: (revenue: any) => {
          // A API provavelmente retorna a data como string, convertemos para objeto Date
          revenue.dateRevenue = new Date(revenue.dateRevenue);

          // Popula o formulário com os dados carregados
          this.revenueForm.patchValue(revenue);

          // Formata o valor monetário no input após o carregamento
          const valueInput = document.querySelector(
            'input[formControlName="valueRevenue"]'
          ) as HTMLInputElement;
          if (valueInput) {
            valueInput.value = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            }).format(revenue.valueRevenue);
          }
        },
        error: (err) => {
          console.error(
            'Falha na requisição. Verifique o console para mais detalhes.'
          );
        },
      });
  }

  // Método para atualizar a receita
  onUpdate() {
    if (this.revenueForm.valid && this.revenueId) {
      this.updateRevenue();
    } else {
      console.error(
        'O formulário não é válido ou o ID da receita está ausente.'
      );
    }
  }

  private updateRevenue() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const updatedRevenue = this.revenueForm.value;

    this.http
      .put(`http://localhost:3000/revenues/${this.revenueId}`, updatedRevenue, {
        headers,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao atualizar receita:', error);
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Erro ao salvar receita'));
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Receita atualizada com sucesso!', response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(
            'Falha na requisição. Verifique o console para mais detalhes.'
          );
        },
      });
  }

  // Métodos reutilizados do componente de adição
  openIconPicker() {
    this.iconPickerDialog.show();
  }

  onIconSelected(icon: string) {
    this.revenueForm.get('icon')?.setValue('pi ' + icon);
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
    this.revenueForm
      .get('valueRevenue')
      ?.setValue(numericValue, { emitEvent: false });
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(numericValue);
    inputElement.value = formattedValue;
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }
}
