import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '',
        loadChildren: () => import('./features/layout/layout.route').then(m => m.layoutRoutes)

    },
    {path: 'producto',
         loadChildren: () => import('./features/producto/producto.route').then(m => m.productoRoutes)
    }
];
