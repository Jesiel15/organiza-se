import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Suporte } from './suporte';

describe('Suporte', () => {
  let component: Suporte;
  let fixture: ComponentFixture<Suporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Suporte],
    }).compileComponents();

    fixture = TestBed.createComponent(Suporte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
