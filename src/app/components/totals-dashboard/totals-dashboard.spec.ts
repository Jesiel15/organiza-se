import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsDashboard } from './totals-dashboard';

describe('TotalsDashboard', () => {
  let component: TotalsDashboard;
  let fixture: ComponentFixture<TotalsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
