import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-pedido', // El selector para usar este componente
  templateUrl: './dashboard-pedido.component.html',
  styleUrls: ['./dashboard-pedido.component.css']
})
export class DashboardPedidoComponent implements OnInit {

  // Propiedad para almacenar todos los pedidos
  allPedidos: any[] = [];
  // Propiedad para almacenar los pedidos que se mostrarán (después de aplicar filtros)
  filteredPedidos: any[] = [];
  // Propiedad para controlar la pestaña activa (Todos, Pendientes, etc.)
  activeTab: string = 'Todos'; // Por defecto, mostrar todos los pedidos

  constructor() { }

  ngOnInit(): void {
    // Aquí es donde normalmente cargarías los pedidos desde un servicio (ej. API, Supabase)
    // Por ahora, usaremos datos de prueba para la visualización.
    this.allPedidos = [
      { id: '#1023', cliente: 'María López', productos: 2, estado: 'Pendiente', fecha: '12/06/2024', total: 120.00 },
      { id: '#1022', cliente: 'Carlos Ruiz', productos: 1, estado: 'Confirmado', fecha: '11/06/2024', total: 45.00 },
      { id: '#1021', cliente: 'Ana Torres', productos: 3, estado: 'Cancelado', fecha: '10/06/2024', total: 80.00 },
      { id: '#1020', cliente: 'Laura García', productos: 5, estado: 'Pendiente', fecha: '09/06/2024', total: 250.00 },
      { id: '#1019', cliente: 'Pedro Martínez', productos: 1, estado: 'Confirmado', fecha: '08/06/2024', total: 60.00 },
      { id: '#1018', cliente: 'Sofía Díaz', productos: 2, estado: 'Entregado', fecha: '07/06/2024', total: 95.00 } // Agregado para probar el estado "Entregado"
    ];

    // Inicialmente, mostrar todos los pedidos
    this.filterPedidos('Todos');
  }

  /**
   * Filtra los pedidos según el estado seleccionado.
   * @param status El estado por el cual filtrar (ej. 'Todos', 'Pendiente', 'Confirmado', 'Cancelado').
   */
  filterPedidos(status: string): void {
    this.activeTab = status; // Establece la pestaña activa

    if (status === 'Todos') {
      this.filteredPedidos = [...this.allPedidos]; // Muestra todos los pedidos
    } else {
      // Filtra los pedidos por el estado seleccionado
      this.filteredPedidos = this.allPedidos.filter(pedido => pedido.estado === status);
    }
  }

  // Si necesitas navegar a la página de detalle de un pedido
  goToPedidoDetail(pedidoId: string): void {
    console.log('Navegar a detalle del pedido:', pedidoId);
    // Aquí usarías el Router de Angular para navegar:
    // import { Router } from '@angular/router';
    // constructor(private router: Router) { }
    // this.router.navigate(['/pedidos', 'detalle', pedidoId]);
  }
}