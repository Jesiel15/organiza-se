import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconPickerDialog } from '../../components/icon-picker-dialog/icon-picker-dialog';

@Component({
  selector: 'app-adicionar-despesas',
  standalone: false,
  templateUrl: './adicionar-despesas.html',
  styleUrl: './adicionar-despesas.scss',
})
export class AdicionarDespesas {
  @ViewChild(IconPickerDialog)
  iconPickerDialog!: IconPickerDialog; // Get a reference to the modal component

  expenseForm: FormGroup;
  valor: number = 151351;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      icon: ['pi pi-credit-card', Validators.required],
      color: ['', [Validators.required]],
      nameExpense: ['', [Validators.required]],
      valueExpense: ['', Validators.required],
      dateExpense: ['', Validators.required],
      anotation: ['', Validators.required],

      // icon: string;
      // color: string;
      // nameExpense: string;
      // valueExpense: number;
      // dateExpense: Date;
      // anotation: string;
    });
  }

  openIconPicker() {
    this.iconPickerDialog.show(); // Call the show method of the modal component
  }

  onIconSelected(icon: string) {
    this.expenseForm.get('icon')?.setValue(icon); // Update the form control with the selected icon
  }

  onSubmit() {}

  getIconColor(hexColor: string | null | undefined): string {
    if (!hexColor) {
      return 'black'; // Cor padrão se nenhuma cor for selecionada
    }

    // Função simples para determinar se a cor é clara ou escura
    // para escolher a cor do texto (preto ou branco)
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? 'black' : 'white'; // 155 é um bom limite, ajuste conforme necessário
  }
}
