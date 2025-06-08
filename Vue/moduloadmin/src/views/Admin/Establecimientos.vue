<template>
  <div class="establecimientos">
    <h2>Gestión de establecimientos</h2>

    <div class="tabs">
      <button :class="{ active: activeTab === 'habilitados' }" @click="activeTab = 'habilitados'">Habilitados</button>
      <button :class="{ active: activeTab === 'deshabilitados' }" @click="activeTab = 'deshabilitados'">Pendientes</button>
    </div>

    <div v-if="activeTab === 'habilitados'" class="lista">
      <EstablecimientosCard
        v-for="(establecimiento, id_establecimiento) in habilitado"
        :key="id_establecimiento"
        :nombre="establecimiento.nombre"
        :direccion="establecimiento.direccion"
        :horario="establecimiento.horario"
        :estado="establecimiento.habilitado ? 'Habilitado' : 'Deshabilitado'"
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
        @aceptar="aceptar(establecimiento)"
        @rechazar="rechazar(establecimiento)"
      />
    </div>    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EstablecimientosCard from '../../components/EstablecimientoCard.vue'
import EstablecimientoDeshabilitadoRow from '../../components/EstablecimientoDeshabilitadoRow.vue'
import type { Establecimiento } from '../../types/establecimiento'

const activeTab = ref('habilitados')

const habilitado: Establecimiento[] = [
  {id_establecimiento:1, nombre: 'Café Aroma', direccion: 'Calle Norte 45', horario: '08:00-20:00', id_inventario: 1, id_comerciante:'1234567890', habilitado:true},
  {id_establecimiento:2, nombre: 'Mercado Verde', direccion: 'Av. Bosque 88', horario: '08:30-21:00', id_inventario: 2, id_comerciante:'0987654321', habilitado:true},
  {id_establecimiento:3, nombre: 'Panadería Dulce', direccion: 'Calle Sol 30', horario: '07:00-19:00', id_inventario: 3, id_comerciante:'1122334455', habilitado:true},
  {id_establecimiento:4, nombre: 'Librería Sabia', direccion: 'Calle Luna 15', horario: '09:00-18:00', id_inventario: 4, id_comerciante:'5566778899', habilitado:true}
]

const deshabilitados: Establecimiento[] = [
  {id_establecimiento:3, nombre: 'Panadería Dulce', direccion: 'Calle Sol 30', horario: '07:00-19:00', id_inventario: 3, id_comerciante:'1122334455', habilitado:false},
  {id_establecimiento:3, nombre: 'Panadería Dulce', direccion: 'Calle Sol 30', horario: '07:00-19:00', id_inventario: 3, id_comerciante:'1122334455', habilitado:false},
]

function aceptar(establecimiento: Establecimiento) {
  alert(`Aceptado: ${establecimiento.nombre}`)
}
function rechazar(establecimiento: Establecimiento) {
  alert(`Rechazado: ${establecimiento.nombre}`)
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
