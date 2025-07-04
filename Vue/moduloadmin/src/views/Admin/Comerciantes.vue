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
        :direccion="comerciante.direccion"
        :telefono="comerciante.telefono"
        :email="comerciante.email"
        :estado="'Habilitado'"
        :textoBotonEstado="'Deshabilitar'"
        @cambiarEstado="actualizarEstado(comerciante)"
        @eliminar="eliminar(comerciante)"
      />
    </div>

    <div v-if="activeTab === 'deshabilitados'" class="solicitudes">
      <ComercianteCard
        v-for="(comerciante, id_comerciante) in deshabilitados"
        :key="id_comerciante"
        :nombre="comerciante.nombre"
        :direccion="comerciante.direccion"
        :telefono="comerciante.telefono"
        :email="comerciante.email"
        :estado="'Deshabilitado'"
        :textoBotonEstado="'Habilitar'"
        @cambiarEstado="actualizarEstado(comerciante)"
        @eliminar="eliminar(comerciante)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ComercianteCard from '../../components/comerciante/ComercianteCard.vue'
import type { Comerciante } from '../../types/comerciante'
import { obtenerComerciantes, actualizarComerciante, eliminarComerciante } from '../../services/servicioComerciante'

const activeTab = ref('habilitados')
const habilitados = ref<Comerciante[]>([])
const deshabilitados = ref<Comerciante[]>([])

async function cargarComerciantes(){
  try{
    const comerciantes: Comerciante[] = await obtenerComerciantes();
    habilitados.value = comerciantes.filter((comerciante)=>{return comerciante.habilitado===true});
    deshabilitados.value = comerciantes.filter((comerciante)=>{return comerciante.habilitado===false});
  }catch(error){
    console.error("Error al cargar las incidencias", error);
  }
}

onMounted(cargarComerciantes);

async function actualizarEstado(comerciante: Comerciante){
  comerciante.habilitado = comerciante.habilitado===false ? true : false;
  await actualizarComerciante(comerciante);
  await cargarComerciantes();
} 

async function eliminar(comerciante: Comerciante) {
  await eliminarComerciante(comerciante);
  await cargarComerciantes();
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