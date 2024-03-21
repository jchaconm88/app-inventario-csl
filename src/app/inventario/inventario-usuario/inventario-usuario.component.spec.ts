import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioUsuarioComponent } from './inventario-usuario.component';

describe('InventarioUsuarioComponent', () => {
  let component: InventarioUsuarioComponent;
  let fixture: ComponentFixture<InventarioUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
