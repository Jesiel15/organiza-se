import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarReceitas } from './adicionar-receitas';

@NgModule({
  declarations: [AdicionarReceitas],
  imports: [CommonModule],
  exports: [AdicionarReceitas],
})
export class AdicionarReceitasModule {}
