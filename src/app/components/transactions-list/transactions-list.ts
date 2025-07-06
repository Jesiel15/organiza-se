import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss',
})
export class TransactionsList {
  constructor(private router: Router) {}

  goToAddDespesa() {
    this.router.navigate(['/add-despesa']);
  }

  goToAddReceita() {
    this.router.navigate(['/add-receita']);
  }
}
