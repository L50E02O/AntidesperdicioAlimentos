<template>
  <div class="establecimiento-card">
    <div class="icon"></div>
    <div class="info">
      <h3>{{ nombre }}</h3>
      <p class="contenido-datos">{{ direccion }}</p>
      <p class="contenido-datos">Horario: {{ horario }}</p>
      <p class="contenido-datos">Estado: {{ estado }}</p>
      <div class="acciones">
        <RouterLink :to="`/inventario/${id_inventario}`" class="btn inventario">Inventario</RouterLink>
        <button class="btn deshabilitar" @click="$emit('deshabilitar')">Deshabilitar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  nombre: String,
  direccion: String,
  horario: String,
  estado: String,
  id_inventario: String,
})
</script>

<style scoped>
.establecimiento-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  flex-direction: column;
  text-align: center;
}

.icon {
  width: 40px;
  height: 40px;
  background-color: #3b82f6;
  border-radius: 50%;
}

.info h3 {
  margin: 0.5rem 0 0.2rem;
  font-size: 1.1rem;
}

.contenido-datos {
  font-size: 0.875rem;
  color: #666;
}

.acciones {
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
}

.btn {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.inventario {
  background-color: #3b82f6;
  color: white;
  text-decoration-line: none;
}

.deshabilitar {
  background-color: #e0e7ff;
  color: #3b82f6;
}
</style>