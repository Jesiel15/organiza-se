import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarReceitas } from './editar-receitas';

describe('EditarReceitas', () => {
  let component: EditarReceitas;
  let fixture: ComponentFixture<EditarReceitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarReceitas],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarReceitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
