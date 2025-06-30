import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { NavItem } from '../../../core/models/INavItem.model'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service/auth.service';

@Component({
  selector: 'app-app-siderbar',
  imports: [CommonModule, RouterModule], // Importa módulos necesarios
  standalone: true,
  templateUrl: './app-siderbar.component.html',
  styleUrls: ['./app-siderbar.component.css']

})
export class AppSiderbarComponent implements OnInit {
  welcomeName: string = '';
  userName: string = '';
  userRole: string = '';


  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.welcomeName = `${usuario.nombre || usuario.id_comerciante || 'Usuario'}`;
      this.userName = usuario.nombre || usuario.id_comerciante || 'Usuario';
      this.userRole = usuario.rol || 'Comerciante';
    }
  }


  navItems: NavItem[] = [
    { label: 'Inicio', route: '/dashboard/inicio', active: true },
    { label: 'Pedidos', route: '/dashboard/pedidos', active: false },
    { label: 'Inventario', route: '/dashboard/inventario', active: false },
    { label: 'Notificaciones', route: '/dashboard/notificaciones', active: false },
    { label: 'Incidencias', route: '/dashboard/incidencias', active: false }

  ];

    setActiveNav(selectedItem: NavItem): void {
    if (!selectedItem.active) {
      this.navItems.forEach(item => item.active = false); // Desactiva todos los
      selectedItem.active = true; // Activa el elemento seleccionado
    }
    console.log(`Navegando a: ${selectedItem.label}`);
    this.router.navigate([selectedItem.route]); // Navega a la ruta del elemento seleccionado
  }
}
