<template>
  <div class="notificaciones-view">
    <h2 class="title">Notificaciones</h2>

    <NotificacionAdminRow
      v-for="n in notificaciones"
      :key="n.id_notificacion"
      :mensaje="n.mensaje"
      :fechaEnvio="n.fecha_envio"
      @eliminar="eliminar(n)"
    />

    <p v-if="notificaciones.length === 0" class="empty">No hay notificaciones.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NotificacionAdminRow from '../../components/notificacionAdmin/NotificacionAdminRow.vue'
import { obtenerNotificacionesAdmin, eliminarNotificacionAdmin } from '../../services/servicioNotificacionAdmin'
import type { NotificacionAdmin } from '../../types/notificacionAdmin'

const notificaciones = ref<NotificacionAdmin[]>([])

onMounted(async () => {
  notificaciones.value = await obtenerNotificacionesAdmin()
})

async function eliminar(notificacion: NotificacionAdmin){
  await eliminarNotificacionAdmin(notificacion);
  notificaciones.value = await obtenerNotificacionesAdmin();
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
