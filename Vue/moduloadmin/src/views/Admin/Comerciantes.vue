<template>
  <div class="comerciantes">
    <h2>Gestión de Comerciantes</h2>

    <div class="tabs">
      <button :class="{ active: activeTab === 'habilitados' }" @click="activeTab = 'habilitados'">Habilitados</button>
      <button :class="{ active: activeTab === 'deshabilitados' }" @click="activeTab = 'deshabilitados'">Deshabilitados</button>
    </div>

    <RouterLink class="crear-comerciante" to="/form-crear-comerciante" >Crear Comerciante</RouterLink>
    
    <div v-if="loading" class="mensaje-info">
      Cargando Comerciantes...
    </div>
    <div v-if="activeTab === 'habilitados'">
      <div v-if="habilitados.length > 0 && loading===false" class="lista">
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
      <div v-if="habilitados.length === 0 && loading===false" class="mensaje-info">
        Actualmente no hay comerciantes habilitados
      </div>
    </div>

    <div v-if="activeTab === 'deshabilitados'">
      <div v-if="deshabilitados.length > 0 && loading===false" class="lista">
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
      <div v-if="deshabilitados.length === 0 && loading===false" class="mensaje-info">
        Actualmente no hay comerciantes deshabilitados
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ComercianteCard from '../../components/comerciante/ComercianteCard.vue'
import type { Comerciante } from '../../types/comerciante'
import { useComercianteStore } from "../../stores/ComercianteStore"
const comercianteStore = useComercianteStore();

onMounted(async ()=>{
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 7000));
  await comercianteStore.cargarComerciantes();
  loading.value = false;
});

const activeTab = ref('habilitados')
const habilitados = computed(()=>{return comercianteStore.comerciantes.filter(c => c.habilitado===true)});
const deshabilitados = computed(()=>{return comercianteStore.comerciantes.filter(c=>c.habilitado===false)});
const loading = ref(true);

async function actualizarEstado(comerciante: Comerciante){
  comerciante.habilitado = comerciante.habilitado ? false : true;
  await comercianteStore.actualizarComercianteStore(comerciante);
} 

async function eliminar(comerciante: Comerciante) {
  await comercianteStore.eliminarComercianteStore(comerciante);
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

.tabs button{
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
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.crear-comerciante {
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