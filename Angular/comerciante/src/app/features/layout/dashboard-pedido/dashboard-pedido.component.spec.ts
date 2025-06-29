import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPedidoComponent } from './dashboard-pedido.component';

describe('DashboardPedidoComponent', () => {
  let component: DashboardPedidoComponent;
  let fixture: ComponentFixture<DashboardPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
