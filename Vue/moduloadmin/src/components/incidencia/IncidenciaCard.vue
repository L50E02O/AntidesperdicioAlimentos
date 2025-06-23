<template>
  <div class="card">
    <p><strong>Descripción:</strong> {{ descripcion }}</p>
    <p><strong>Fecha:</strong> {{ fecha }}</p>
    <p><strong>Estado:</strong></p>
    <select v-model="estadoLocal">
      <option value="pendiente">Pendiente</option>
      <option value="abierto">Abierto</option>
      <option value="resuelto">Resuelto</option>
    </select>

    <p><strong>Comerciante:</strong> {{ idComerciante }}</p>
    <p><strong>Cliente:</strong> {{ idCliente }}</p>

    <div class="acciones">
      <button @click="$emit('actualizar-estado', estadoLocal)">Actualizar estado</button>
      <button @click="$emit('eliminar')">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  descripcion: string
  fecha: string
  estado: string
  idComerciante: string
  idCliente: string
}>()

const estadoLocal = ref(props.estado)

watch(() => props.estado, (nuevo) => {
  estadoLocal.value = nuevo
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 1rem;
}

.acciones {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>
