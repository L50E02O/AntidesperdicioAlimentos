import { createRouter, createWebHistory,  type RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/Admin/Dashboard.vue';
import Establecimientos from '../views/Admin/Establecimientos.vue';
import Notificaciones from '../views/Admin/Notificaciones.vue';
import Incidencias from '../views/Admin/Incidencias.vue';
import Comerciantes from '../views/Admin/Comerciantes.vue';
import FormCrearComerciante from '../components/comerciante/FormCrearComerciante.vue';
import FormCrearIncidencia from '../components/incidencia/FormCrearIncidencia.vue';
import Inventario from '../views/Admin/Inventario.vue';
import ProductoForm from '../components/Productos/ProductoForm.vue';
import PorductoFormEdit from "../components/Productos/ProductoFormEdit.vue"

const routes: RouteRecordRaw[] = [
  {path: '/', redirect: '/dashboard'},
  {path: '/dashboard', component: Dashboard },
  {path: "/establecimientos", component: Establecimientos},
  {path: "/notificaciones", component: Notificaciones},
  {path: "/incidencias", component: Incidencias},
  {path: "/comerciantes", component: Comerciantes},
  {path: "/form-crear-comerciante", component: FormCrearComerciante},
  {path: "/form-crear-incidencia", component: FormCrearIncidencia},
  {path: "/inventario/:id", name: "inventario", component: Inventario, props: true},
  {path: "/producto-form/:id", component: ProductoForm, props: true},
  {path: "/producto-editar/:id/:nombre/:descripcion/:precio/:stock/:id_inventario", name: "producto-editar",component: PorductoFormEdit, props: true}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
