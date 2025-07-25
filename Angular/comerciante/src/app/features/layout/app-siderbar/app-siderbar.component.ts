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
  userAvatarUrl: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAACcElEQVRoBe1ZPWgUQRQ9N4gYLIKgICKKCgkKioKCINioKISFgkpaCaIFFR8UQRBEC4GEIoqFCgoKropCBVu0jBiMGEX8Av47ezP3bne2d3cXZxeYefeeN/N5b957M2u1ewH+BvAHOA0cD94D14GFwDtwCbgN3Hg8kQjE8BHwCugBbgJLwNngWfAYeDk0BO4B28A48AX4W/CFHAEH8C3gCJgBHgJfG22pYgT0ARfgKXAWeAW8BG5o+Z13wN2W5lHgKPAc2AbOAWuAA+AnMAVcAEuAWmAgCBYCXcN9M2APOAaOAwOArsAn4EPg3S0v4kLgEHgLzAGdwAuwBOwCG8DEkGcA70ApcBHYBVaAfcBlYD1wgSbgEbAddAKXgaPAUWAcGAWWEf9YFwk4AWwB24B3wENgE3gEnAauAn3AOfBw9NkJWANWAmeBX8B74P2C55sZgP7AVeAZsA2MAwfAReC7W8C2D8AG8AxcBfYC24A94FbwX2BLxybgLPAHuAIcAs4AW4DvwJshLgf8v8AN4B3wFXgK/AbGAe+AV2AecCMYAX4A7zQCdgAvgTvAU+ApMAvsBVaA/YDZ0BU4BFwGXgcHgaPAUeAmsA0MAefAI+BVcN0G+BJ4CbwFfgGbgLPAK+AlcBsYBVYDNYBzwKMAOAfsAVuAfeBzQJfwEHgK7AQ+AuOAfcA+MEt4DFwBdgOvgffAA+A7cBXoA/4EWvATcBP4CdwBHgaPAUeBt8A08AmsAv8B90E67kbfAK2AOcBP4CVwCRgHvgR6gGngE3AuGAfOAfeA78AX4P8Bo4A7/gHvgX9gEbiptWzC6n8BfAM2PjrAMiL/AAAAAElFTkSuQmCC';


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
    { label: '🏠Inicio', route: '/dashboard/inicio', active: true },
    { label: '🛒Pedidos', route: '/dashboard/pedidos', active: false },
    { label: '💼Inventario', route: '/dashboard/inventario', active: false },
    { label: '🔔Notificaciones', route: '/dashboard/notificaciones', active: false },
    { label: '❗Incidencias', route: '/dashboard/incidencias', active: false }

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
