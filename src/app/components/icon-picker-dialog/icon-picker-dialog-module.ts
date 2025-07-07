import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPickerDialog } from './icon-picker-dialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [IconPickerDialog],
  imports: [CommonModule, DialogModule, ButtonModule],
  exports: [IconPickerDialog],
})
export class IconPickerDialogModule {}
