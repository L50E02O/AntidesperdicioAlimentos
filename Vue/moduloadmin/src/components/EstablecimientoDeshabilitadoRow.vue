<template>
  <div class="deshabilitado-row">
    <div>{{ nombre }}</div>
    <div>{{ direccion }}</div>
    <div>{{ horario }}</div>
    <div>{{ estado }}</div>
    <div class="acciones">
      <button class="habilitar" @click="$emit('Habilitar')">Habilitar</button>
      <button class="deshabilitar" @click="$emit('Eliminar')">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  nombre: String,
  direccion: String,
  horario: String,
  estado: String
})
</script>

<style scoped>

.deshabilitado-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.acciones {
  display: flex;
  gap: 1rem;
}

.acciones button {
  border: none;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
}

.habilitar{
  background-color: #3b82f6;
  color: white;
}

.deshabilitar{
  background-color: #e0e7ff;
  color: #3b82f6;
}

</style>
