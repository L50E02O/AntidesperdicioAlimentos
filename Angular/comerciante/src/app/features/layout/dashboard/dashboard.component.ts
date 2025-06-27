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
  userAvatarUrl: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAACcElEQVRoBe1ZPWgUQRQ9N4gYLIKgICKKCgkKioKCINioKISFgkpaCaIFFR8UQRBEC4GEIoqFCgoKropCBVu0jBiMGEX8Av47ezP3bne2d3cXZxeYefeeN/N5b957M2u1ewH+BvAHOA0cD94D14GFwDtwCbgN3Hg8kQjE8BHwCugBbgJLwNngWfAYeDk0BO4B28A48AX4W/CFHAEH8C3gCJgBHgJfG22pYgT0ARfgKXAWeAW8BG5o+Z13wN2W5lHgKPAc2AbOAWuAA+AnMAVcAEuAWmAgCBYCXcN9M2APOAaOAwOArsAn4EPg3S0v4kLgEHgLzAGdwAuwBOwCG8DEkGcA70ApcBHYBVaAfcBlYD1wgSbgEbAddAKXgaPAUWAcGAWWEf9YFwk4AWwB24B3wENgE3gEnAauAn3AOfBw9NkJWANWAmeBX8B74P2C55sZgP7AVeAZsA2MAwfAReC7W8C2D8AG8AxcBfYC24A94FbwX2BLxybgLPAHuAIcAs4AW4DvwJshLgf8v8AN4B3wFXgK/AbGAe+AV2AecCMYAX4A7zQCdgAvgTvAU+ApMAvsBVaA/YDZ0BU4BFwGXgcHgaPAUeAmsA0MAefAI+BVcN0G+BJ4CbwFfgGbgLPAK+AlcBsYBVYDNYBzwKMAOAfsAVuAfeBzQJfwEHgK7AQ+AuOAfcA+MEt4DFwBdgOvgffAA+A7cBXoA/4EWvATcBP4CdwBHgaPAUeBt8A08AmsAv8B90E67kbfAK2AOcBP4CVwCRgHvgR6gGngE3AuGAfOAfeA78AX4P8Bo4A7/gHvgX9gEbiptWzC6n8BfAM2PjrAMiL/AAAAAElFTkSuQmCC';

  navItems: NavItem[] = [
    { label: 'Inicio', route: '#', active: true },
    { label: 'Pedidos', route: '#', active: false },
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
      this.userAvatarUrl = usuario.avatarUrl || this.userAvatarUrl;
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