import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIncidenciaComponent } from './dashboard-incidencia.component';

describe('DashboardIncidenciaComponent', () => {
  let component: DashboardIncidenciaComponent;
  let fixture: ComponentFixture<DashboardIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardIncidenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
