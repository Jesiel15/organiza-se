import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarReceitas } from './adicionar-receitas';

describe('AdicionarReceitas', () => {
  let component: AdicionarReceitas;
  let fixture: ComponentFixture<AdicionarReceitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarReceitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarReceitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
