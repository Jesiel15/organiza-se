import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home';

@NgModule({
  declarations: [Home],
  imports: [CommonModule],
  exports: [Home],
})
export class HomeModule {}
