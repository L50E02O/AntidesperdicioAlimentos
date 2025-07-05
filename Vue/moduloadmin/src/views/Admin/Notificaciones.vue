<template>
  <div class="notificaciones-view">
    <h2 class="title">Notificaciones</h2>

    <NotificacionAdminRow
      v-for="n in notificacionesAdminStore.notificacionesAdmin"
      :key="n.id_notificacion"
      :mensaje="n.mensaje"
      :fechaEnvio="n.fecha_envio"
      :textoBoton="'Elimiar'"
      @accion="eliminar(n)"
    />
    <p v-if="notificacionesAdminStore.notificacionesAdmin.length === 0" class="empty">No hay notificaciones.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import NotificacionAdminRow from '../../components/notificacionAdmin/NotificacionAdminRow.vue'
import type { NotificacionAdmin } from '../../types/notificacionAdmin'
import { useNotificacionesAdminStore } from '../../stores/notificacionAdminStore'

const notificacionesAdminStore = useNotificacionesAdminStore();

onMounted(async () => {
  await notificacionesAdminStore.cargarNotificaciones();
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
