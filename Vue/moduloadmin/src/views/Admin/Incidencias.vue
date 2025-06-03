<template>
  <div>
    <h2>Lista de Incidencias</h2>

    <div class="tabs">
      <button :class="{ active: filtro === 'todas' }" @click="filtro = 'todas'">Todas</button>
      <button :class="{ active: filtro === 'abierto' }" @click="filtro = 'abierto'">Abiertas</button>
      <button :class="{ active: filtro === 'resuelto' }" @click="filtro = 'resuelto'">Resueltas</button>
      <button :class="{ active: filtro === 'pendiente' }" @click="filtro = 'pendiente'">Pendientes</button>
    </div>

    <div class="tabla">
      <div class="row header">
        <div>Fecha</div>
        <div>Cliente</div>
        <div>Comerciante</div>
        <div>Estado</div>
        <div>Acción</div>
      </div>

      <IncidenciaRow
        v-for="incidencia in incidenciasFiltradas"
        :key="incidencia.id_incidencia"
        :incidencia="incidencia"
        :abierta="incidenciaAbierta === incidencia.id_incidencia"
        @toggle="toggleDetalle"
        @cambiarEstado="cambiarEstado"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import IncidenciaRow from '../../components/IncidenciaRow.vue' 
import type { Incidencia } from '../../types/incidencia.vue' 

const filtro = ref<'todas' | 'abierto' | 'pendiente' | 'resuelto'>('todas')
const incidenciaAbierta = ref<number | null>(null)

const incidencias = ref<Incidencia[]>([
  {
    id_incidencia: 1,
    descripcion: 'Se reportó mal olor en productos.',
    fecha: '2025-06-01',
    estado: 'pendiente',
    id_comerciante: 2,
    id_cliente: 1,
    comerciante_nombre: 'Verduras El Sol',
    cliente_nombre: 'Laura García'
  },
  {
    id_incidencia: 2,
    descripcion: 'El producto estaba caducado.',
    fecha: '2025-05-30',
    estado: 'resuelto',
    id_comerciante: 3,
    id_cliente: 2,
    comerciante_nombre: 'Frutas Norte',
    cliente_nombre: 'Pedro Martínez'
  }
])

const incidenciasFiltradas = computed(() => {
  if (filtro.value === 'todas') return incidencias.value
  return incidencias.value.filter(i => i.estado === filtro.value)
})

function toggleDetalle(id: number) {
  incidenciaAbierta.value = incidenciaAbierta.value === id ? null : id
}

function cambiarEstado(id: number, nuevoEstado: 'abierto' | 'pendiente' | 'resuelto') {
  const incidencia = incidencias.value.find(i => i.id_incidencia === id)
  if (incidencia) incidencia.estado = nuevoEstado
}
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
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

.tabla {
  width: 100%;
}

.row.header {
  font-weight: bold;
  background-color: #f0f0f0;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr auto;
  gap: 1rem;
  padding: 0.75rem 0;
}
</style>






<!-- <template>
  <div>
    <h2>Lista de Incidencias</h2>

    <div class="tabs">
      <button :class="{ active: filtro === 'todas' }" @click="filtro = 'todas'">Todas</button>
      <button :class="{ active: filtro === 'abierto' }" @click="filtro = 'abierto'">Abiertas</button>
      <button :class="{ active: filtro === 'resuelto' }" @click="filtro = 'resuelto'">Resueltas</button>
      <button :class="{ active: filtro === 'pendiente' }" @click="filtro = 'pendiente'">Pendientes</button>
    </div>

    <div class="tabla">
      <div class="row header">
        <div>Fecha</div>
        <div>Cliente</div>
        <div>Comerciante</div>
        <div>Estado</div>
        <div>Acción</div>
      </div>

      <div
        v-for="incidencia in incidenciasFiltradas"
        :key="incidencia.id_incidencia"
        class="row"
      >
        <div>{{ incidencia.fecha }}</div>
        <div>{{ incidencia.cliente_nombre }}</div>
        <div>{{ incidencia.comerciante_nombre }}</div>
        <div>{{ incidencia.estado }}</div>
        <div>
          <button @click="toggleDetalle(incidencia.id_incidencia)">
            {{ incidenciaAbierta === incidencia.id_incidencia ? 'Ocultar' : 'Ver más' }}
          </button>
        </div>

        <div v-if="incidenciaAbierta === incidencia.id_incidencia" class="detalle">
          <p><strong>Descripción:</strong> {{ incidencia.descripcion }}</p>
          <div class="estado-buttons">
            <button @click="cambiarEstado(incidencia.id_incidencia, 'abierto')">🔓 Abierto</button>
            <button @click="cambiarEstado(incidencia.id_incidencia, 'pendiente')">🕓 Pendiente</button>
            <button @click="cambiarEstado(incidencia.id_incidencia, 'resuelto')">✅ Resuelto</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<!-- <script setup lang="ts">
import { ref, computed } from 'vue'
import type { Incidencia } from '../../types/incidencia.vue'

const filtro = ref<'todas' | 'abierto' | 'pendiente' | 'resuelto'>('todas')
const incidenciaAbierta = ref<number | null>(null)

const incidencias = ref<Incidencia[]>([
  {
    id_incidencia: 1,
    descripcion: 'Se reportó mal olor en productos.',
    fecha: '2025-06-01',
    estado: 'pendiente',
    id_comerciante: 2,
    id_cliente: 1,
    comerciante_nombre: 'Verduras El Sol',
    cliente_nombre: 'Laura García'
  },
  {
    id_incidencia: 2,
    descripcion: 'El producto estaba caducado.',
    fecha: '2025-05-30',
    estado: 'resuelto',
    id_comerciante: 3,
    id_cliente: 2,
    comerciante_nombre: 'Frutas Norte',
    cliente_nombre: 'Pedro Martínez'
  }
  // Puedes agregar más de prueba
])

const incidenciasFiltradas = computed(() => {
  if (filtro.value === 'todas') return incidencias.value
  return incidencias.value.filter(i => i.estado === filtro.value)
})

function toggleDetalle(id: number) {
  incidenciaAbierta.value = incidenciaAbierta.value === id ? null : id
}

function cambiarEstado(id: number, nuevoEstado: 'abierto' | 'pendiente' | 'resuelto') {
  const incidencia = incidencias.value.find(i => i.id_incidencia === id)
  if (incidencia) incidencia.estado = nuevoEstado
}
</script> -->

<!-- <style scoped>
h2 {
  margin-bottom: 1rem;
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

.tabla {
  width: 100%;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr auto;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ddd;
  align-items: center;
}

.header {
  font-weight: bold;
  background-color: #f0f0f0;
}

.detalle {
  grid-column: 1 / -1;
  background: #f9f9f9;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 8px;
}

.estado-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.estado-buttons button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.estado-buttons button:nth-child(1) {
  background-color: #fde68a;
}
.estado-buttons button:nth-child(2) {
  background-color: #93c5fd;
}
.estado-buttons button:nth-child(3) {
  background-color: #86efac;
}
</style> -->
