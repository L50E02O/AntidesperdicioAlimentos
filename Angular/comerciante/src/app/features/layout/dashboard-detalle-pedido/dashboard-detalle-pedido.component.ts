import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../../../core/models/IPedido.model';
import { readPedidoService } from '../../../core/services/pedido.service/read-pedido.service';
import { updatePedidoService } from '../../../core/services/pedido.service/update-pedido.service';
import { readDetallePedidoService } from '../../../core/services/detallePedido.service/read-detallePedido.service';

@Component({
  selector: 'app-dashboard-detalle-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-detalle-pedido.component.html',
  styleUrls: ['./dashboard-detalle-pedido.component.css']
})
export class DashboardDetallePedidoComponent implements OnInit {
  pedido: any = null;
  detallesPedido: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readPedidoService: readPedidoService,
    private updatePedidoService: updatePedidoService,
    private readDetallePedidoService: readDetallePedidoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pedidoId = params['id'];
      if (pedidoId) {
        this.loadPedido(pedidoId);
        this.loadDetallesPedido(pedidoId);
      }
    });
  }

  async loadPedido(pedidoId: string): Promise<void> {
    try {
      this.loading = true;
      this.error = '';
      
      const pedido = await this.readPedidoService.readPedidoPorId(String(pedidoId));
      
      if (pedido) {
        this.pedido = pedido;
      } else {
        this.error = 'Pedido no encontrado';
      }
    } catch (error) {
      this.error = 'Error al cargar el pedido';
    } finally {
      this.loading = false;
    }
  }

  async loadDetallesPedido(pedidoId: string): Promise<void> {
    try {
      const detalles = await this.readDetallePedidoService.readDetallePedidoPorEstablecimiento(pedidoId);
      this.detallesPedido = detalles || [];
    } catch (error) {
      console.error('Error al cargar detalles del pedido:', error);
      this.detallesPedido = [];
    }
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  async cambiarEstado(nuevoEstado: string): Promise<void> {
    if (this.pedido && this.pedido.id_pedido) {
      try {
        const resultado = await this.updatePedidoService.updatePedido(
          this.pedido.id_pedido, 
          { estado: nuevoEstado }
        );
        
        this.pedido.estado = nuevoEstado;
        alert('Estado actualizado correctamente');
      } catch (error) {
        alert('Error al actualizar el estado');
      }
    }
  }

  volverALista(): void {
    this.router.navigate(['/dashboard/pedidos']);
  }
}
