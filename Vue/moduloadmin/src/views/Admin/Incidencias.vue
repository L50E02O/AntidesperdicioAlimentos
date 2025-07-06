<template>
  <div class="incidencias-view">
    <h2 class="title">Gestión de incidencias</h2>
    <RouterLink to="/form-crear-incidencia" class="crear-incidencia">Crear Incidencia</RouterLink>

    <section class="section">
      <h3>Pendientes</h3>
      <IncidenciaCard
        v-for="incidencia in pendientes"
        :key="incidencia.id_incidencia"
        :descripcion="incidencia.descripcion"
        :fecha="incidencia.fecha"
        :estado="incidencia.estado"
        :comerciante="incidencia.id_comerciante"
        :cliente="incidencia.id_cliente"
        @actualizar-estado="(estado: string) => actualizarEstado(incidencia, estado)"
        @eliminar="eliminarIncidencia(incidencia)"
      />
      <p v-if="pendientes.length === 0" class="empty">No hay incidencias pendientes.</p>
    </section>

    <section class="section">
      <h3>Abiertas</h3>
      <IncidenciaCard
        v-for="incidencia in abiertas"
        :key="incidencia.id_incidencia"
        :descripcion="incidencia.descripcion"
        :fecha="incidencia.fecha"
        :estado="incidencia.estado"
        :comerciante="incidencia.id_comerciante"
        :cliente="incidencia.id_cliente"
        @actualizar-estado="(estado: string) => actualizarEstado(incidencia, estado)"
        @eliminar="eliminar(incidencia)"
      />
      <p v-if="abiertas.length === 0" class="empty">No hay incidencias abiertas.</p>
    </section>

    <section class="section">
      <h3>Resueltas</h3>
      <IncidenciaCard
        v-for="incidencia in resueltas"
        :key="incidencia.id_incidencia"
        :descripcion="incidencia.descripcion"
        :fecha="incidencia.fecha"
        :estado="incidencia.estado"
        :comerciante="incidencia.id_comerciante"
        :cliente="incidencia.id_cliente"
        @actualizar-estado="(estado: string) => actualizarEstado(incidencia, estado)"
        @eliminar="eliminar(incidencia)"
      />
      <p v-if="resueltas.length === 0" class="empty">No hay incidencias resueltas.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IncidenciaCard from '../../components/incidencia/IncidenciaCard.vue'
import type { Incidencia } from '../../types/incidencia'
import { obtenerIncidencias, actualizarIncidencia, eliminarIncidencia } from '../../services/servicioIncidencia'

const pendientes = ref<Incidencia[]>([])
const abiertas   = ref<Incidencia[]>([])
const resueltas  = ref<Incidencia[]>([])

async function cargarIncidencias() {
  try {
    const todas = await obtenerIncidencias()
    pendientes.value = todas.filter(i => i.estado === 'pendiente')
    abiertas.value   = todas.filter(i => i.estado === 'abierto')
    resueltas.value  = todas.filter(i => i.estado === 'resuelto')
  } catch (error) {
    console.error('Error al cargar incidencias:', error)
  }
}

onMounted(cargarIncidencias)

async function actualizarEstado(incidencia: Incidencia, nuevoEstado: string) {
  if (incidencia.estado === nuevoEstado) return;
  try {
    incidencia.estado = nuevoEstado;
    await actualizarIncidencia(incidencia);
    await cargarIncidencias();
  } catch (error) {
    console.error('No se pudo actualizar el estado:', error);
  }
}

async function eliminar(incidencia: Incidencia) {
  try {
    await eliminarIncidencia(incidencia);
    await cargarIncidencias();
  } catch (error) {
    console.error('No se pudo eliminar la incidencia:', error);
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
.crear-incidencia {
  width: fit-content;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
  text-decoration-line: none;
}
</style>