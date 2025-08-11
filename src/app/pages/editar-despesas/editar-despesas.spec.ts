import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarDespesas } from './editar-despesas';

describe('EditarDespesas', () => {
  let component: EditarDespesas;
  let fixture: ComponentFixture<EditarDespesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarDespesas],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarDespesas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
