<template>
  <div class="establecimientos">
    <h2>Gestión de establecimientos</h2>

    <div class="tabs">
      <button :class="{ active: activeTab === 'habilitados' }" @click="activeTab = 'habilitados'">Habilitados</button>
      <button :class="{ active: activeTab === 'deshabilitados' }" @click="activeTab = 'deshabilitados'">Pendientes</button>
    </div>

    <div v-if="activeTab === 'habilitados'" class="lista">
      <EstablecimientosCard
        v-for="(establecimiento, id_establecimiento) in habilitados"
        :key="id_establecimiento"
        :nombre="establecimiento.nombre"
        :direccion="establecimiento.direccion"
        :horario="establecimiento.horario"
        :estado="establecimiento.habilitado ? 'Habilitado' : 'Deshabilitado'"
        :id_inventario="establecimiento.id_inventario"
        @deshabilitar="actualizarEstado(establecimiento)"
      />
    </div>

    <div v-if="activeTab === 'deshabilitados'" class="solicitudes">
      <EstablecimientoDeshabilitadoRow
        v-for="(establecimiento, id_establecimiento) in deshabilitados"
        :key="id_establecimiento"
        :nombre="establecimiento.nombre"
        :direccion="establecimiento.direccion"
        :horario="establecimiento.horario"
        :estado="establecimiento.habilitado ? 'Habilitado' : 'Deshabilitado'"
        @habilitar="actualizarEstado(establecimiento)"
        @eliminar="eliminar(establecimiento)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EstablecimientosCard from '../../components/establecimiento/EstablecimientoCard.vue'
import EstablecimientoDeshabilitadoRow from '../../components/establecimiento/EstablecimientoDeshabilitadoRow.vue'
import type { Establecimiento } from '../../types/establecimiento'
import { obtenerEstablecimientos, actualizarEstablecimiento, eliminarEstablecimiento } from '../../services/servicioEstablecimiento'

const activeTab = ref('habilitados')
const habilitados = ref<Establecimiento[]>([])
const deshabilitados = ref<Establecimiento[]>([])

async function cargarEstablecimientos(){
  const establecimientos: Establecimiento[] = await obtenerEstablecimientos();
  habilitados.value = establecimientos.filter((establecimiento)=>{return establecimiento.habilitado===true});
  deshabilitados.value = establecimientos.filter((establecimiento)=>{return establecimiento.habilitado==false});
}

onMounted(cargarEstablecimientos);

async function actualizarEstado(establecimiento: Establecimiento){
  establecimiento.habilitado = establecimiento.habilitado===false ? true : false;
  await actualizarEstablecimiento(establecimiento);
  await cargarEstablecimientos();
}

async function eliminar(establecimiento:Establecimiento) {
  await eliminarEstablecimiento(establecimiento);
  await cargarEstablecimientos();
}
</script>


<style scoped>
.comerciantes {
  padding: 1rem;
}
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.tabs button {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.5rem;
  cursor: pointer;
}
.tabs button.active {
  border-color: black;
  font-weight: bold;
}
.lista {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.solicitudes {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
