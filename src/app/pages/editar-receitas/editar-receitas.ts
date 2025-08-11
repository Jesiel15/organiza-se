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
  revenueId: string | null = null;
  monthYear: string | null = null;

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
    // Captura os dois parâmetros da rota
    this.monthYear = this.route.snapshot.paramMap.get('monthYear');
    this.revenueId = this.route.snapshot.paramMap.get('revenueId');

    if (this.monthYear && this.revenueId) {
      this.loadRevenueData();
    } else {
      console.error(
        'Parâmetros de rota (monthYear ou revenueId) não encontrados.'
      );
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

    // Usa monthYear e revenueId na URL
    this.http
      .get(
        `http://localhost:3000/revenues/${this.monthYear}/${this.revenueId}`,
        { headers }
      )
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao carregar receitas:', error);
          if (error.status === 404) {
            this.router.navigate(['/home']);
          } else if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Erro ao carregar receitas'));
        })
      )
      .subscribe({
        next: (revenue: any) => {
          revenue.dateRevenue = new Date(revenue.dateRevenue);
          this.revenueForm.patchValue(revenue);
        },
      });
  }

  onUpdate() {
    if (this.revenueForm.valid && this.monthYear && this.revenueId) {
      this.updateRevenue();
    } else {
      console.error(
        'O formulário não é válido ou os parâmetros de rota estão ausentes.'
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
      .put(
        `http://localhost:3000/revenues/${this.monthYear}/${this.revenueId}`,
        updatedRevenue,
        {
          headers,
        }
      )
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
