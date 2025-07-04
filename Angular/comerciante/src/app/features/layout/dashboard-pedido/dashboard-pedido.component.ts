import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { readPedidoService } from '../../../core/services/pedido.service/read-pedido.service';
import { readEstablecimientoService } from '../../../core/services/establecimiento.service/read-establecimiento.service';

@Component({
  selector: 'app-dashboard-pedido', // El selector para usar este componente
  templateUrl: './dashboard-pedido.component.html',
  standalone: true,

  imports: [CommonModule], // Importa módulos necesarios
  styleUrls: ['./dashboard-pedido.component.css']
})
export class DashboardPedidoComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  // Propiedad para almacenar todos los pedidos
  allPedidos: any[] = [];
  // Propiedad para almacenar los pedidos que se mostrarán (después de aplicar filtros)
  filteredPedidos: any[] = [];
  // Propiedad para controlar la pestaña activa (Todos, Pendientes, etc.)
  activeTab: string = 'Todos'; // Por defecto, mostrar todos los pedidos

  constructor(private authService: AuthService, 
    private router: Router,
    private readPedidoService: readPedidoService,
    private readEstablecimientoService: readEstablecimientoService
  ) { }

  async ngOnInit(): Promise<void> {
    const usuario = this.authService.getUsuario();

    if (usuario) {
      this.userName = usuario.nombre || usuario.id_comerciante || 'Usuario';
      this.userRole = usuario.rol || 'Comerciante';

    try {
      //  Obtengo establecimientos del comerciante
      const establecimientos = await this.readEstablecimientoService.readEstablecimientoPorComerciante(usuario.id_comerciante);

      if (establecimientos.length > 0) {
        // Obtengo pedidos de esos establecimientos
        let pedidosTotales: any[] = [];
        console.log('Establecimientos:', establecimientos);
for (const est of establecimientos) {
  const pedidos = await this.readPedidoService.readPedidoPorEstablecimiento(est.id_establecimiento);
  pedidosTotales = [...pedidosTotales, ...pedidos];
}

        this.allPedidos = pedidosTotales;
        this.filteredPedidos = [...this.allPedidos];
      } else {
        this.allPedidos = [];
        this.filteredPedidos = [];
      }
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      this.allPedidos = [];
      this.filteredPedidos = [];
    }
  }
}
    
  
    
    filterPedidos(estado: string) {
    if (estado === 'Todos') {
      this.filteredPedidos = this.allPedidos;
    } else {
      this.filteredPedidos = this.allPedidos.filter(p => p.estado === estado);
    }
  }

  goToPedidoDetail(id: number) {
    // Suponiendo que tienes una ruta como /pedido/:id
    this.router.navigate(['/pedido', id]);
  }

  objectKeys(obj: any): string[] {
  return obj ? Object.keys(obj) : [];
}

}