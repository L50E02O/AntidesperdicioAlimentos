<template>
  <div class="comerciantes">
    <h2>Gestión de Comerciantes</h2>

    <div class="tabs">
      <button :class="{ active: activeTab === 'habilitados' }" @click="activeTab = 'habilitados'">Habilitados</button>
      <button :class="{ active: activeTab === 'deshabilitados' }" @click="activeTab = 'deshabilitados'">Deshabilitados</button>
    </div>

    <div>
      <RouterLink to="/form-crear-comerciante" >Crear Comerciante</RouterLink>
    </div>

    <div v-if="activeTab === 'habilitados'" class="lista">
      <ComercianteCard
        v-for="(comerciante, id_comerciante) in habilitados"
        :key="id_comerciante"
        :nombre="comerciante.nombre"
        :id="comerciante.id_comerciante"
        :direccion="comerciante.direccion"
        :telefono="comerciante.telefono"
        :email="comerciante.email"
        :estado="comerciante.habilitado ? 'Habilitado' : 'Deshabilitado'"
        @deshabilitar="deshabilitar(comerciante)"
        @eliminar="eliminar(comerciante)"
      />
    </div>

    <div v-if="activeTab === 'deshabilitados'" class="solicitudes">
      <ComercianteDeshabCard
        v-for="(comerciante, id_comerciante) in deshabilitados"
        :key="id_comerciante"
        :nombre="comerciante.nombre"
        :direccion="comerciante.direccion"
        :telefono="comerciante.telefono"
        :email="comerciante.email"
        :estado="comerciante.habilitado ? 'Habilitado' : 'Deshabilitado'"
        @habilitar="habilitar(comerciante)"
        @eliminar="eliminar(comerciante)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ComercianteCard from '../../components/comerciante/ComercianteCard.vue'
import ComercianteDeshabCard from '../../components/comerciante/ComercianteDeshabCard.vue'
import type { Comerciante } from '../../types/comerciante'

import {
  obtenerComerciantesHabilitados,
  obtenerComerciantesDeshabilitados,
  habilitar,
  deshabilitar,
  eliminar,
} from '../../services/servicioComerciante'

const activeTab = ref('habilitados')
const habilitados = ref<Comerciante[]>([])
const deshabilitados = ref<Comerciante[]>([])

onMounted(async () => {
  habilitados.value = await obtenerComerciantesHabilitados()
  deshabilitados.value = await obtenerComerciantesDeshabilitados()
})
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