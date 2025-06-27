import {Routes} from '@angular/router';
import { DashboardComponent } from './dashboard-general/dashboard.component';
import { DashboardPedidoComponent } from './dashboard-pedido/dashboard-pedido.component';


export const layoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard-pedido', component: DashboardPedidoComponent}
]
