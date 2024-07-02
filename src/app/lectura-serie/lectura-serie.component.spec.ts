import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaSerieComponent } from './lectura-serie.component';

describe('LecturaSerieComponent', () => {
  let component: LecturaSerieComponent;
  let fixture: ComponentFixture<LecturaSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturaSerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturaSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
