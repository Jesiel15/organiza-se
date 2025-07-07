import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private totalExpensesSubject = new BehaviorSubject<number>(0);
  private totalRevenuesSubject = new BehaviorSubject<number>(0);

  totalExpenses$ = this.totalExpensesSubject.asObservable();
  totalRevenues$ = this.totalRevenuesSubject.asObservable();

  setTotalExpenses(value: number) {
    this.totalExpensesSubject.next(value);
  }

  setTotalRevenues(value: number) {
    this.totalRevenuesSubject.next(value);
  }
}
