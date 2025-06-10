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
        @inventario=""
        @deshabilitar="deshabilitar(establecimiento)"
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
        @habilitar="habilitar(establecimiento)"
        @eliminar="eliminar(establecimiento)"
      />
    </div>    
  </div>
</template>

<script setup lang="ts">
import {supabase} from '../../config/supabase'
import EstablecimientosCard from '../../components/EstablecimientoCard.vue'
import EstablecimientoDeshabilitadoRow from '../../components/EstablecimientoDeshabilitadoRow.vue'
import type { Establecimiento } from '../../types/establecimiento'
import {ref, onMounted} from 'vue'

const activeTab = ref('habilitados')

const habilitados = ref<Establecimiento>([])
const deshabilitados = ref<Establecimiento>([])

// Cargar los establecimientos habilitados al montar el componente
onMounted(async () => {
  const { data, error } = await supabase
    .from('establecimiento')
    .select('*')
    .order('id_establecimiento', { ascending: true })
    .eq('habilitado', true)
  if (error) {
    console.error(error)}
  else {
    console.log("Se obtenieron los establecimiento habilitados correctamente")
    habilitados.value = data || []
    console.log(data)
  }
})

onMounted(async () => {
  const { data, error } = await supabase
    .from('establecimiento')
    .select('*')
    .order('id_establecimiento', { ascending: true })
    .eq('habilitado', false)
  if (error) {
    console.error(error)}
  else {
    console.log("Se obtenieron los establecimientos deshabilitados correctamente")
    deshabilitados.value = data || []
    console.log(data)
  }
})

async function habilitar(establecimiento: Establecimiento){
  const {error} = await supabase
  .from("establecimiento")
  .update({habilitado:true})
  .eq("id_establecimiento", establecimiento.id_establecimiento)
  if (error){
    console.error("No se pudo habilitar el establecimiento:", error)
  }else{
    alert(`Establecimiento ${establecimiento.nombre} habilitado correctamente`)
    // Actualizar la lista de habilitados
    const index = habilitados.value.findIndex(e => e.id_establecimiento === establecimiento.id_establecimiento);
  }
}

async function deshabilitar(establecimiento: Establecimiento){
  const {error} = await supabase
  .from("establecimiento")
  .update({habilitado:false})
  .eq("id_establecimiento", establecimiento.id_establecimiento)
  if (error){
    console.error("No se pudo deshabilitar el establecimiento:", error)
  }else{
    alert(`Establecimiento ${establecimiento.nombre} deshabilitado correctamente`)
    // Actualizar la lista de deshabilitados
    const index = deshabilitados.value.findIndex(e => e.id_establecimiento === establecimiento.id_establecimiento);
  }
}

async function eliminar(establecimiento: Establecimiento){
  const {error} = await supabase
  .from("establecimiento")
  .delete()
  .eq("id_establecimiento", establecimiento.id_establecimiento)
  if (error){
    console.error("No se pudo eliminar el establecimiento:", error)
  }else{
    alert(`Establecimiento ${establecimiento.nombre} eliminado correctamente`)
    // Actualizar la lista de deshabilitados
    const index = deshabilitados.value.findIndex(e => e.id_establecimiento === establecimiento.id_establecimiento);
    if (index !== -1) {
      deshabilitados.value.splice(index, 1);
    }
  }
}

</script>

<style scoped>

.establecimientos {
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
}
.solicitudes {
  margin-top: 1rem;
}
</style>
