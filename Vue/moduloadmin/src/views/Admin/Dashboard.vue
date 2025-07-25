<template>
    <div class="contenido">
      <div class="titulo">
        <h2>Resumen general</h2>
        <button class="boton" @click="cerrarSesion">Cerrar Sesión</button>
      </div>
    
      <div class="resumen-general">
        <ResumenCard
          titulo="Habilitados"
          subtitulo="Establecimientos"
          textoBoton="Ver todos"
          @boton-click="verApartado('/establecimientos')">
          <template #icono>
          </template>
        </ResumenCard>

        <ResumenCard
          titulo="Habilitados"
          subtitulo="Comerciantes"
          textoBoton="Ver todos"
          @boton-click="verApartado('/comerciantes')">
          <template #icono>
            📄
          </template>
        </ResumenCard>

        <ResumenCard
          titulo="Pendientes"
          subtitulo="Incidencias"
          textoBoton="Ver todos"
          @boton-click="verApartado('/incidencias')">
          <template #icono>
          </template>
        </ResumenCard>
      </div>

      <h2>Notificaciones recientes</h2>
      <div v-if="loading" class="mensaje-info">
        Cargando Notificaciones...
      </div>
      <div v-if="notificacionesAdminStore.notificacionesAdmin.length > 0 && loading === false" class="notificaciones-recientes">
        <NotificacionAdminRow
          v-for="n in notificacionesAdminStore.notificacionesAdmin.slice(0, 3)"
          :key="n.id_notificacion"
          :mensaje="n.mensaje"
          :fechaEnvio="n.fecha_envio"
          :textoBoton="'Ver Más'"
          @accion="verApartado('/notificaciones')"
        />
      </div>
      <div v-if="notificacionesAdminStore.notificacionesAdmin.length === 0 && loading===false" class="mensaje-info">
        Actualmente no hay Notificacion para mostrar
      </div>
    </div>
</template>

<script setup lang="ts">
import ResumenCard from '../../components/dashboard/ResumenCard.vue';
import router from '../../router';
import NotificacionAdminRow from '../../components/notificacionAdmin/NotificacionAdminRow.vue';
import { useNotificacionesAdminStore } from '../../stores/notificacionAdminStore';
import { useAuthStore } from '../../stores/authStore';
import { onMounted, ref } from 'vue';

const notificacionesAdminStore = useNotificacionesAdminStore();
const authStore = useAuthStore();
const loading = ref(true);

onMounted(async () =>{
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  await notificacionesAdminStore.cargarNotificaciones();
  loading.value = false;
});

const verApartado = (ruta: string) => {
  router.push(ruta);
}

const cerrarSesion = () => {
  authStore.logout();
  window.parent.postMessage({ type: 'logout-admin' }, '*');
}

</script>

<style scoped>
.contenido{
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.resumen-general {
  display: flex;
  width: 100%;
  border-radius: 12px;
  gap: 15px
}

.notificaciones-recientes {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px ;
}

.titulo {
  display: flex;
  width: 100%;
  gap: 60%;
}

.boton {
  margin-bottom: 50px;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  width: 40%;
}
.boton:hover {
  background: #2563eb;
}

h2{
  width: 100%;
}
</style>