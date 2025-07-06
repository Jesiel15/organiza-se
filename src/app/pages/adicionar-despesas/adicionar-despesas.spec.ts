import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarDespesas } from './adicionar-despesas';

describe('AdicionarDespesas', () => {
  let component: AdicionarDespesas;
  let fixture: ComponentFixture<AdicionarDespesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarDespesas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarDespesas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
