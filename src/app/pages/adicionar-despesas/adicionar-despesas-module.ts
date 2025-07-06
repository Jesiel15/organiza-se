import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarDespesas } from './adicionar-despesas';

@NgModule({
  declarations: [AdicionarDespesas],
  imports: [CommonModule],
  exports: [AdicionarDespesas],
})
export class AdicionarDespesasModule {}
