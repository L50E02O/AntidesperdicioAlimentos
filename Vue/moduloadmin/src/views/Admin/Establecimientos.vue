<template>
  <div class="establecimientos">
    <h2>Gestión de establecimientos</h2>

    <div class="tabs">
      <button :class="{ active: activeTab === 'activos' }" @click="activeTab = 'activos'">Activos</button>
      <button :class="{ active: activeTab === 'pendientes' }" @click="activeTab = 'pendientes'">Pendientes</button>
      <button :class="{ active: activeTab === 'rechazados' }" @click="activeTab = 'rechazados'">Rechazados</button>
    </div>

    <div v-if="activeTab === 'activos'" class="lista">
      <EstablecimientosCard
        v-for="(item, i) in activos"
        :key="i"
        :icon="item.icon"
        :nombre="item.nombre"
        :direccion="item.direccion"
        :horario="item.horario"
      />
    </div>

    <div v-if="activeTab === 'pendientes'" class="solicitudes">
      <SolicitudPendienteRow
        v-for="(item, i) in pendientes"
        :key="i"
        :nombre="item.nombre"
        :direccion="item.direccion"
        :horario="item.horario"
        :estado="item.estado"
        @aceptar="aceptar(item)"
        @rechazar="rechazar(item)"
      />
    </div>

    <!-- Aquí puedes agregar el bloque para rechazados -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EstablecimientosCard from '../../components/EstablecimientoCard.vue'
import SolicitudPendienteRow from '../../components/SolicitudPendienteRow.vue'

const activeTab = ref('activos')

const activos = [
  { icon: '🏬', nombre: 'Panadería La Paz', direccion: 'Av. Central 123', horario: '08:00-20:00' },
  { icon: '🍎', nombre: 'Frutería El Sol', direccion: 'Calle Luna 45', horario: '09:00-18:00' },
  { icon: '🛒', nombre: 'Supermercado Norte', direccion: 'Av. Norte 200', horario: '07:00-22:00' }
]

const pendientes = [
  { nombre: 'Café Aroma', direccion: 'Calle Sur 12', horario: '10:00-19:00', estado: 'Pendiente' },
  { nombre: 'Mercado Verde', direccion: 'Av. Bosque 88', horario: '08:30-21:00', estado: 'Pendiente' }
]

function aceptar(item) {
  alert(`Aceptado: ${item.nombre}`)
}
function rechazar(item) {
  alert(`Rechazado: ${item.nombre}`)
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
