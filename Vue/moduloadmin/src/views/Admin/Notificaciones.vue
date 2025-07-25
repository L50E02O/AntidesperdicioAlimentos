<template>
  <div class="notificaciones-view">
    <h2 class="title">Notificaciones</h2>
    <div v-if="loading" class="mensaje-info">
      Cargando Notificaciones...
    </div>
    <div v-else>
      <NotificacionAdminRow
        v-for="n in notificacionesAdminStore.notificacionesAdmin"
        :key="n.id_notificacion"
        :mensaje="n.mensaje"
        :fechaEnvio="n.fecha_envio"
        :textoBoton="'Elimiar'"
        @accion="eliminar(n)"
      />
      <p v-if="notificacionesAdminStore.notificacionesAdmin.length === 0" class="mensaje-info">No hay notificaciones.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NotificacionAdminRow from '../../components/notificacionAdmin/NotificacionAdminRow.vue'
import type { NotificacionAdmin } from '../../types/notificacionAdmin'
import { useNotificacionesAdminStore } from '../../stores/notificacionAdminStore'

const notificacionesAdminStore = useNotificacionesAdminStore();
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 700));
  await notificacionesAdminStore.cargarNotificaciones();
  loading.value = false;
})

async function eliminar(notificacion: NotificacionAdmin){
  notificacionesAdminStore.eliminarNotificacion(notificacion);
}

</script>

<style scoped>
.notificaciones-view {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.empty {
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>
