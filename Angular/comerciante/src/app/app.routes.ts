import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/layout/dashboard-general/dashboard.component';
import { DashboardPedidoComponent } from './features/layout/dashboard-pedido/dashboard-pedido.component';
import { DashboardInventarioComponent } from './features/layout/dashboard-inventario/dashboard-inventario.component';
import { DashboardNotificacionComponent } from './features/layout/dashboard-notificacion/dashboard-notificacion.component';
import { DashboardIncidenciaComponent } from './features/layout/dashboard-incidencia/dashboard-incidencia.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: DashboardComponent },
      { path: 'pedidos', component: DashboardPedidoComponent },
      { path: 'inventario', component: DashboardInventarioComponent },
      { path: 'notificaciones', component: DashboardNotificacionComponent },
      { path: 'incidencias', component: DashboardIncidenciaComponent }
      // aquí puedes ir agregando más páginas de dashboard
    ]
  }
];

