import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDunComponent } from './inventario-dun.component';

describe('InventarioDunComponent', () => {
  let component: InventarioDunComponent;
  let fixture: ComponentFixture<InventarioDunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioDunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioDunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
