import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCard } from '../../../core/models/IDashboardCard.model'; 
import { AuthService } from '../../../core/services/auth.service/auth.service'; // Importa el AuthService
import { Router } from '@angular/router'; // Importa Router para la navegación
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  welcomeName: string = '';
  userName: string = '';
  userRole: string = '';

  quickAccessCards: DashboardCard[] = [
    { title: 'Pedidos', subtitle: 'Gestiona tus pedidos', buttonText: 'Ver pedidos', route: '/dashboard/pedidos' },
    { title: 'Inventario', subtitle: 'Controla tu stock', buttonText: 'Ver inventario', route: '/dashboard/inventario' },
    { title: 'Notificaciones', subtitle: 'Mensajes recientes', buttonText: 'Ver notificaciones', route: '/dashboard/notificaciones' },
    { title: 'Incidencias', subtitle: 'Reportes y seguimiento', buttonText: 'Ver incidencias', route: '/dashboard/incidencias' }
  ];

  cerrarSesionCard: DashboardCard = {
    title: 'Cerrar sesión',
    subtitle: 'Finaliza tu sesión actual',
    buttonText: 'Cerrar sesión'
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.welcomeName = `${usuario.nombre || usuario.id_comerciante || 'Usuario'}`;
      this.userName = usuario.nombre || usuario.id_comerciante || 'Usuario';
      this.userRole = usuario.rol || 'Comerciante';
    }
  }

handleCardAction(cardTitle: string): void {
  const card = this.quickAccessCards.find(c => c.title === cardTitle);
  if (cardTitle === 'Cerrar sesión') {
    this.logout();
  } else if (card && card.route) {
    this.navigateTo(card.route);
  } else {
    // fallback
    this.navigateTo(cardTitle.toLowerCase().replace(' ', '-'));
  }
}

  navigateTo(route: string): void {
    this.router.navigate([route]);
    console.log(`Navigated to: ${route}`);
  }

  logout(): void {
    this.authService.logout();
    console.log(`${this.userName} ha cerrado sesión`);
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

}

