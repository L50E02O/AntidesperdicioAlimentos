<template>
  <div class="establecimiento-card">
    <div class="icon">{{ icon }}</div>
    <h3>{{ nombre }}</h3>
    <p>{{ direccion }}</p>
    <p>{{ horario }}</p>
    <div class="buttons">
      <button class="inventario">Inventario</button>
      <button class="desactivar">Desactivar</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  nombre: String,
  direccion: String,
  horario: String
})
</script>

<style scoped>
.establecimiento-card {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  width: 200px;
}
.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
}
button {
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}
button.desactivar {
  background: #c4c4c4;
}
</style>
