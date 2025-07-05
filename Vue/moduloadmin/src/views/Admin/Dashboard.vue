<template>
    <div class="contenido">

      <h2>Resumen general</h2>
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
      <div class="notificaciones-recientes">
        <NotificacionAdminRow
          v-for="n in notificacionesAdminStore.notificacionesAdmin.slice(0, 3)"
          :key="n.id_notificacion"
          :mensaje="n.mensaje"
          :fechaEnvio="n.fecha_envio"
          :textoBoton="'Ver Más'"
          @accion="verApartado('/notificaciones')"
        />
      </div>
    </div>
</template>

<script setup lang="ts">
import ResumenCard from '../../components/dashboard/ResumenCard.vue';
import router from '../../router';
import NotificacionAdminRow from '../../components/notificacionAdmin/NotificacionAdminRow.vue';
import { useNotificacionesAdminStore } from '../../stores/notificacionAdminStore';
import { onMounted } from 'vue';

const notificacionesAdminStore = useNotificacionesAdminStore();

onMounted(async () =>{
  await notificacionesAdminStore.cargarNotificaciones();
});

const verApartado = (ruta: string) => {
  router.push(ruta);
}

</script>

<style>
.contenido{
  display: flex;
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
</style>