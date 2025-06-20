import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Admin/Dashboard.vue';
import Establecimientos from '../views/Admin/Establecimientos.vue';
import Notificaciones from '../views/Admin/Notificaciones.vue';
import Incidencias from '../views/Admin/Incidencias.vue';
import Comerciantes from '../views/Admin/Comerciantes.vue';
import FormCrearComerciante from '../components/comerciante/FormCrearComerciante.vue';
import FormCrearIncidencia from '../components/incidencia/FormCrearIncidencia.vue';

const routes = [
  {path: '/', redirect: '/dashboard'},
  { path: '/dashboard', component: Dashboard },
  {path: "/establecimientos", component: Establecimientos},
  {path: "/notificaciones", component: Notificaciones},
  {path: "/incidencias", component: Incidencias},
  {path: "/comerciantes", component: Comerciantes},
  {path: "/form-crear-comerciante", component: FormCrearComerciante},
  {path: "/form-crear-incidencia", component: FormCrearIncidencia}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
