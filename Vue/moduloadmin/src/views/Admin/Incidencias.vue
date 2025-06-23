<template>
  <div class="incidencias-view">
    <h2 class="title">Gestión de incidencias</h2>
    <div>
        <RouterLink to="/form-crear-incidencia" class="button">Crear Incidencia</RouterLink>
    </div>

    <section class="section">
      <h3>Pendientes</h3>
      <IncidenciaCard
        v-for="inc in pendientes"
        :key="inc.id_incidencia"
        :descripcion="inc.descripcion"
        :fecha="inc.fecha"
        :estado="inc.estado"
        :idComerciante="inc.id_comerciante"
        :idCliente="inc.id_cliente"
        @actualizar-estado="estado => actualizarEstado(inc, estado)"
        @eliminar="eliminarIncidencia(inc)"
      />
      <p v-if="pendientes.length === 0" class="empty">No hay incidencias pendientes.</p>
    </section>

    <section class="section">
      <h3>Abiertas</h3>
      <IncidenciaCard
        v-for="inc in abiertas"
        :key="inc.id_incidencia"
        :descripcion="inc.descripcion"
        :fecha="inc.fecha"
        :estado="inc.estado"
        :idComerciante="inc.id_comerciante"
        :idCliente="inc.id_cliente"
        @actualizar-estado="estado => actualizarEstado(inc, estado)"
        @eliminar="eliminarIncidencia(inc)"
      />
      <p v-if="abiertas.length === 0" class="empty">No hay incidencias abiertas.</p>
    </section>

    <section class="section">
      <h3>Resueltas</h3>
      <IncidenciaCard
        v-for="inc in resueltas"
        :key="inc.id_incidencia"
        :descripcion="inc.descripcion"
        :fecha="inc.fecha"
        :estado="inc.estado"
        :idComerciante="inc.id_comerciante"
        :idCliente="inc.id_cliente"
        @actualizar-estado="estado => actualizarEstado(inc, estado)"
        @eliminar="eliminarIncidencia(inc)"
      />
      <p v-if="resueltas.length === 0" class="empty">No hay incidencias resueltas.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IncidenciaCard from '../../components/incidencia/IncidenciaCard.vue'
import type { Incidencia } from '../../types/incidencia'
import {
  obtenerTodasIncidencias,
  actualizarEstadoIncidencia,
  eliminarIncidencia as srvEliminar
} from '../../services/servicioIncidencia'

const pendientes = ref<Incidencia[]>([])
const abiertas   = ref<Incidencia[]>([])
const resueltas  = ref<Incidencia[]>([])

/* ----- Cargar datos desde Supabase ----- */
async function cargarIncidencias() {
  try {
    const todas = await obtenerTodasIncidencias()
    pendientes.value = todas.filter(i => i.estado === 'pendiente')
    abiertas.value   = todas.filter(i => i.estado === 'abierto')
    resueltas.value  = todas.filter(i => i.estado === 'resuelto')
  } catch (error) {
    console.error('Error al cargar incidencias:', error)
  }
}

onMounted(cargarIncidencias)

/* ----- Actualizar estado ----- */
async function actualizarEstado(inc: Incidencia, nuevoEstado: string) {
  if (inc.estado === nuevoEstado) return
  try {
    await actualizarEstadoIncidencia(inc.id_incidencia, nuevoEstado)
    await cargarIncidencias() // refrescar listas
  } catch (error) {
    console.error('No se pudo actualizar el estado:', error)
  }
}

/* ----- Eliminar ----- */
async function eliminarIncidencia(inc: Incidencia) {
  try {
    await srvEliminar(inc.id_incidencia)
    await cargarIncidencias()
  } catch (error) {
    console.error('No se pudo eliminar la incidencia:', error)
  }
}
</script>

<style scoped>
.incidencias-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.section h3 {
  margin-bottom: 0.75rem;
}
.empty {
  color: #666;
  font-style: italic;
}
</style>