<template>
  <div class="contenedor-boton-retroceder">
    <button class="boton-retroceder" @click="$emit('cambiarRuta')">
      < Atrás
    </button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.contenedor-boton-retroceder {
  padding: 0px 0;
}

.boton-retroceder {
  background-color: #f3f4f6; /* gris claro */
  color: #111827; /* casi negro */
  border: 1px solid #d1d5db; /* borde gris */
  border-radius: 8px;
  padding: 4px 15px;
  font-size: 13px;
  cursor: pointer;
}

.boton-retroceder:hover {
  background-color: #e5e7eb;
  color: #3e79f6; /* azul suave */
}
</style>
