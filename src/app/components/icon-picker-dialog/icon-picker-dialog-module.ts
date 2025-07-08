import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPickerDialog } from './icon-picker-dialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IconPickerDialog],
  imports: [CommonModule, ReactiveFormsModule, DialogModule, ButtonModule],
  exports: [IconPickerDialog],
})
export class IconPickerDialogModule {}
