import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '../../../core/models/INavItem.model'; 
import { DashboardCard } from '../../../core/models/IDashboardCard.model'; 
import { AuthService } from '../../../core/services/auth.service/auth.service'; // Importa el AuthService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  welcomeName: string = '';
  userName: string = '';
  userRole: string = '';


  navItems: NavItem[] = [
    { label: 'Inicio', route: '#', active: true },
    { label: 'Pedidos', route: '/dashboard/pedidos', active: false },
    { label: 'Inventario', route: '#', active: false },
    { label: 'Incidencias', route: '#', active: false },
    { label: 'Notificaciones', route: '#', active: false }
  ];

  quickAccessCards: DashboardCard[] = [
    { title: 'Pedidos', subtitle: 'Gestiona tus pedidos', buttonText: 'Ver pedidos' },
    { title: 'Inventario', subtitle: 'Controla tu stock', buttonText: 'Ver inventario' },
    { title: 'Notificaciones', subtitle: 'Mensajes recientes', buttonText: 'Ver notificaciones' },
    { title: 'Incidencias', subtitle: 'Reportes y seguimiento', buttonText: 'Ver incidencias' }
  ];

  summaryCards: DashboardCard[] = [
    { title: 'Pedidos pendientes', subtitle: '3 pedidos por entregar', buttonText: 'Ver detalles' },
    { title: 'Próximos a vencer', subtitle: '5 productos en riesgo', buttonText: 'Revisar inventario' }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.welcomeName = `${usuario.nombre || usuario.id_comerciante || 'Usuario'}`;
      this.userName = usuario.nombre || usuario.id_comerciante || 'Usuario';
      this.userRole = usuario.rol || 'Comerciante';
    }
  }

  handleCardAction(cardTitle: string): void {
    console.log(`Action for: ${cardTitle}`);
    // Implement navigation or other logic here
  }

  setActiveNav(selectedItem: NavItem): void {
    this.navItems.forEach(item => item.active = false);
    selectedItem.active = true;
    console.log(`Navigated to: ${selectedItem.label}`);
    // Implement actual navigation logic here
  }
}