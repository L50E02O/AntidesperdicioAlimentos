import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotificacionComponent } from './dashboard-notificacion.component';

describe('DashboardNotificacionComponent', () => {
  let component: DashboardNotificacionComponent;
  let fixture: ComponentFixture<DashboardNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNotificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
