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
      icon: ['', Validators.required],
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
}
