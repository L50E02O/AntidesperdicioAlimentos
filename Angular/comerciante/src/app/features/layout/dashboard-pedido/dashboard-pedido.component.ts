import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      const usuario = this.authService.getUsuario();

      if (usuario) {
      this.userName = usuario.nombre || usuario.id_comerciante || 'Usuario';
      this.userRole = usuario.rol || 'Comerciante';

        // Simulación de pedidos obtenidos del backend
        this.allPedidos = [
          { id: '1', estado: 'Pendiente', fecha: '2023-10-01', total: 100, cliente: 'Cliente A' },
          { id: '2', estado: 'Confirmado', fecha: '2023-10-02', total: 200, cliente: 'Cliente B' },
          { id: '3', estado: 'Cancelado', fecha: '2023-10-03', total: 150, cliente: 'Cliente C' },
          { id: '4', estado: 'Pendiente', fecha: '2023-10-04', total: 300, cliente: 'Cliente D' },
          { id: '5', estado: 'Confirmado', fecha: '2023-10-05', total: 250, cliente: 'Cliente E' }
        ];

        // Inicialmente, mostrar todos los pedidos
        this.filteredPedidos = [...this.allPedidos];

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



}