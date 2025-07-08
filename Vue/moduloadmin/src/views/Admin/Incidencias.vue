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
import { ref, onMounted, computed } from 'vue'
import IncidenciaCard from '../../components/incidencia/IncidenciaCard.vue'
import type { Incidencia } from '../../types/incidencia'
import { obtenerIncidencias, actualizarIncidencia, eliminarIncidencia } from '../../services/servicioIncidencia'

const incidencias = ref<Incidencia[]>([]);

const pendientes = computed(()=>{return incidencias.value.filter(i=>i.estado==='pendiente')});
const abiertas   = computed(()=>{return incidencias.value.filter(i=>i.estado==='abierto')});
const resueltas  = computed(()=>{return incidencias.value.filter(i=>i.estado==='resuelto')});

onMounted(async ()=>{
  incidencias.value = await obtenerIncidencias();
  console.log(incidencias.value)
  console.log(pendientes.value)
});

async function actualizarEstado(incidencia: Incidencia, nuevoEstado: string) {
  if (incidencia.estado === nuevoEstado) return;
  incidencia.estado = nuevoEstado;
  await actualizarIncidencia(incidencia);
}

async function eliminar(incidencia: Incidencia) {
  await eliminarIncidencia(incidencia);
  incidencias.value = incidencias.value.filter((i)=>{return i.id_incidencia!==incidencia.id_incidencia});
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