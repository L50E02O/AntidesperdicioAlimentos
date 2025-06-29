<template>
    <div class="contenido">

      <h2>Resumen general</h2>
      <div class="resumen-general">
        <ResumenCard
          titulo="Habilitados"
          subtitulo="Establecimientos"
          cantidad="12 habilitados"
          textoBoton="Ver todos"
          @boton-click="verEstablecimientos">
          <template #icono>
          </template>
        </ResumenCard>

        <ResumenCard
          titulo="Habilitados"
          subtitulo="Comerciantes"
          cantidad="5 habilitados"
          textoBoton="Ver todos"
          @boton-click="revisarSolicitudes">
          <template #icono>
            📄
          </template>
        </ResumenCard>

          <ResumenCard
          titulo="Pendientes"
          subtitulo="Incidencias"
          cantidad="3 sin ressolver"
          textoBoton="Ver todos"
          @boton-click="revisarSolicitudes">
          <template #icono>
          </template>
        </ResumenCard>
      </div>

      <h2>Notificaciones recientes</h2>
      <div class="notificaciones-recientes">
      </div>
    </div>
</template>

<script setup lang="ts">
import ResumenCard from '../../components/dashboard/ResumenCard.vue';

const verEstablecimientos = () => {
  alert('Ver todos los establecimientos habilitados');
}
const revisarSolicitudes = () => {
  alert('Revisar todas las solicitudes pendientes');
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
}

.notificaciones-recientes {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px ;
}
</style>