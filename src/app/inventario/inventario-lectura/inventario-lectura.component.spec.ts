import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioLecturaComponent } from './inventario-lectura.component';

describe('InventarioLecturaComponent', () => {
  let component: InventarioLecturaComponent;
  let fixture: ComponentFixture<InventarioLecturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioLecturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
