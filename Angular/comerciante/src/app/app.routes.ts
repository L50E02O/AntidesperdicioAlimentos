import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroComponent } from './features/auth/registro/registro.component';
import { DashboardComponent } from './features/layout/dashboard-general/dashboard.component';
import { DashboardPedidoComponent } from './features/layout/dashboard-pedido/dashboard-pedido.component';
import { DashboardInventarioComponent } from './features/layout/dashboard-inventario/dashboard-inventario.component';
import { DashboardNotificacionComponent } from './features/layout/dashboard-notificacion/dashboard-notificacion.component';
import { DashboardIncidenciaComponent } from './features/layout/dashboard-incidencia/dashboard-incidencia.component';
import { DashboardDetallePedidoComponent } from './features/layout/dashboard-detalle-pedido/dashboard-detalle-pedido.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { AgregarProductoComponent } from './features/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './features/editar-producto/editar-producto.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/wrappers/admin-wrapper/admin-wrapper.component').then(m => m.AdminWrapperComponent)
  },
  {
    path: 'cliente',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/wrappers/cliente-wrapper/cliente-wrapper.component').then(m => m.ClienteWrapperComponent)
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: DashboardComponent },
      { path: 'pedidos', component: DashboardPedidoComponent },
      { path: 'inventario', component: DashboardInventarioComponent },
      { path: 'notificaciones', component: DashboardNotificacionComponent },
      { path: 'incidencias', component: DashboardIncidenciaComponent },
      { path: 'detalle-pedido/:id', component: DashboardDetallePedidoComponent },
      { path: 'agregar-producto', component: AgregarProductoComponent },
      { path: 'editar-producto/:id', component: EditarProductoComponent },      // páginas de dashboard
    ]
  }
];

