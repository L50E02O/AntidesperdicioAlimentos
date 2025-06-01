import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Admin/Dashboard.vue';
import Establecimientos from '../views/Admin/Establecimientos.vue';
import Notificaciones from '../views/Admin/Notificaciones.vue';
import Incidencias from '../views/Admin/Incidencias.vue';
import Comerciantes from '../views/Admin/Comerciantes.vue';

const routes = [
  {path: '/', redirect: '/dashboard'},
  { path: '/dashboard', component: Dashboard },
  {path: "/establecimientos", component: Establecimientos},
  {path: "/notificaciones", component: Notificaciones},
  {path: "/incidencias", component: Incidencias},
  {path: "/comerciantes", component: Comerciantes}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
