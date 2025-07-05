<template>
  <div class="productos-row">
    <div>{{ nombre }}</div>
    <div>{{ descripcion }}</div>
    <div>$ {{ precio }}</div>
    <div>{{ stock }}</div>
    <div class="acciones">
      <button class="editar" @click="$emit('editar')">Editar</button>
      <button class="eliminar" @click="$emit('eliminar')">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
});
</script>

<style scoped>
.productos-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr auto;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  gap: 10px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.acciones {
  display: flex;
  gap: 8px;
}

.editar, .eliminar {
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.editar {
  background-color: #3b82f6;
  color: white;
  text-decoration-line: none;
}

.eliminar {
  background-color: #ef4444;
  color: white;
}
</style>