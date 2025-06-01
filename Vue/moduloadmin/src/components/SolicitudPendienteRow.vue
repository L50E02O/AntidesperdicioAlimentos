<template>
  <div class="solicitud-row">
    <div>{{ nombre }}</div>
    <div>{{ direccion }}</div>
    <div>{{ horario }}</div>
    <div>{{ estado }}</div>
    <div class="acciones">
      <button @click="$emit('aceptar')">✔️</button>
      <button @click="$emit('rechazar')">❌</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombre: String,
  direccion: String,
  horario: String,
  estado: String
})
</script>

<style scoped>
.solicitud-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}
.acciones button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
