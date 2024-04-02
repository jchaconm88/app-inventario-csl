import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioLecturaCajaComponent } from './inventario-lectura-caja.component';

describe('InventarioLecturaCajaComponent', () => {
  let component: InventarioLecturaCajaComponent;
  let fixture: ComponentFixture<InventarioLecturaCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioLecturaCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioLecturaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
