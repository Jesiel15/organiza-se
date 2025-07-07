import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPickerDialog } from './icon-picker-dialog';

describe('IconPickerDialog', () => {
  let component: IconPickerDialog;
  let fixture: ComponentFixture<IconPickerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconPickerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPickerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
