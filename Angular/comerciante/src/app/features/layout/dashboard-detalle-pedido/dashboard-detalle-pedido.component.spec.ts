import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetallePedidoComponent } from './dashboard-detalle-pedido.component';

describe('DashboardDetallePedidoComponent', () => {
  let component: DashboardDetallePedidoComponent;
  let fixture: ComponentFixture<DashboardDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDetallePedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
