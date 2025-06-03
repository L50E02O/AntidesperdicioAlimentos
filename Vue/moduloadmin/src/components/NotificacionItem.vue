<template>
  <div class="notificacion-item">
    <div class="icon">{{ icon }}</div>
    <div class="contenido">
      <p class="titulo">{{ titulo }}</p>
      <p class="descripcion">{{ descripcion }}</p>
    </div>
    <div class="acciones">
      <span v-if="importante" class="estrella">⭐</span>
      <span class="menu">⋯</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  titulo: String,
  descripcion: String,
  importante: Boolean
})
</script>

<style scoped>
.notificacion-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.2s;
  gap: 1rem;
}

.icon {
  font-size: 1.5rem;
  background-color: #e0e7ff;
  padding: 0.75rem;
  border-radius: 9999px;
}

.contenido {
  flex: 1;
}

.titulo {
  font-weight: 600;
}

.descripcion {
  color: #777;
  font-size: 0.875rem;
}

.acciones {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #555;
}

.menu {
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
