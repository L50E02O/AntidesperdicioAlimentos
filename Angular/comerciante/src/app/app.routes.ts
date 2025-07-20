import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/layout/dashboard-general/dashboard.component';
import { DashboardPedidoComponent } from './features/layout/dashboard-pedido/dashboard-pedido.component';
import { DashboardInventarioComponent } from './features/layout/dashboard-inventario/dashboard-inventario.component';
import { DashboardNotificacionComponent } from './features/layout/dashboard-notificacion/dashboard-notificacion.component';
import { DashboardIncidenciaComponent } from './features/layout/dashboard-incidencia/dashboard-incidencia.component';
import { DashboardDetallePedidoComponent } from './features/layout/dashboard-detalle-pedido/dashboard-detalle-pedido.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { AgregarProductoComponent } from './features/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './features/editar-producto/editar-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadComponent: () => import('./pages/wrappers/admin-wrapper/admin-wrapper.component').then(m => m.AdminWrapperComponent)
  },
  {
    path: 'cliente',
    loadComponent: () => import('./pages/wrappers/cliente-wrapper/cliente-wrapper.component').then(m => m.ClienteWrapperComponent)
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: DashboardComponent },
      { path: 'pedidos', component: DashboardPedidoComponent },
      { path: 'inventario', component: DashboardInventarioComponent },
      { path: 'notificaciones', component: DashboardNotificacionComponent },
      { path: 'incidencias', component: DashboardIncidenciaComponent },
      { path: 'detalle-pedido/:id', component: DashboardDetallePedidoComponent },
      { path: 'agregar-producto', component: AgregarProductoComponent },
      { path: 'editar-producto/:id', component: EditarProductoComponent }
      // páginas de dashboard
    ]
  }
];

