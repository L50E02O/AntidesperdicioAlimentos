<template>
  <div class="establecimientos">
    <h2>Gestión de establecimientos</h2>

    <div class="tabs">
      <button :class="{ active: activeTab === 'habilitados' }" @click="activeTab = 'habilitados'">Habilitados</button>
      <button :class="{ active: activeTab === 'deshabilitados' }" @click="activeTab = 'deshabilitados'">Pendientes</button>
    </div>

    <div v-if="loading" class="mensaje-info">
      Cargando Establecimientos...
    </div>

    <div v-if="activeTab === 'habilitados' && !loading">
      <div v-if="habilitados.length > 0" class="lista">
        <EstablecimientosCard
          v-for="(establecimiento) in habilitados"
          :key="establecimiento.id_establecimiento"
          :nombre="establecimiento.nombre"
          :direccion="establecimiento.direccion"
          :horario="establecimiento.horario"
          :estado="establecimiento.habilitado ? 'Habilitado' : 'Deshabilitado'"
          :id_inventario="establecimiento.id_inventario"
          @deshabilitar="actualizarEstado(establecimiento)"
        />
      </div>
      <div v-else class="mensaje-info">
        Actualmente no hay establecimientos habilitados
      </div>
    </div>

    <div v-if="activeTab === 'deshabilitados' && !loading">
      <div v-if="deshabilitados.length > 0" class="solicitudes">
        <EstablecimientoDeshabilitadoRow
          v-for="(establecimiento) in deshabilitados"
          :key="establecimiento.id_establecimiento"
          :nombre="establecimiento.nombre"
          :direccion="establecimiento.direccion"
          :horario="establecimiento.horario"
          :estado="establecimiento.habilitado ? 'Habilitado' : 'Deshabilitado'"
          @habilitar="actualizarEstado(establecimiento)"
          @eliminar="eliminar(establecimiento)"
        />
      </div>
      <div v-else class="mensaje-info">
        Actualmente no hay establecimientos deshabilitados
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import EstablecimientosCard from '../../components/establecimiento/EstablecimientoCard.vue'
import EstablecimientoDeshabilitadoRow from '../../components/establecimiento/EstablecimientoDeshabilitadoRow.vue'
import type { Establecimiento } from '../../types/establecimiento'
import { obtenerEstablecimientos, actualizarEstablecimiento, eliminarEstablecimiento } from '../../services/servicioEstablecimiento'

const activeTab = ref('habilitados')
const loading = ref(true);

const establecimientos = ref<Establecimiento[]>([]);
const habilitados = computed(()=>{return establecimientos.value.filter((e)=>e.habilitado===true)});
const deshabilitados = computed(()=>{return establecimientos.value.filter((e)=> e.habilitado===false)});

async function cargarEstablecimientos(){
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 700));
  establecimientos.value = await obtenerEstablecimientos();
  loading.value = false;
}

onMounted(cargarEstablecimientos);

async function actualizarEstado(establecimiento: Establecimiento){
  establecimiento.habilitado = establecimiento.habilitado===false ? true : false;
  await actualizarEstablecimiento(establecimiento);
}

async function eliminar(establecimiento:Establecimiento) {
  await eliminarEstablecimiento(establecimiento);
  establecimientos.value = establecimientos.value.filter((e)=>{return e.id_establecimiento!==establecimiento.id_establecimiento});
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
