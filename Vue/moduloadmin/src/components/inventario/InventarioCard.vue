<template>
  <div class="inventario-card">
    <div class="info">
      <p class="contenido-datos"> <b>ID:</b> {{ id_inventario }}</p>
      <p class="contenido-datos"> <b>Fecha de actualizacion:</b>  {{ fecha_actualizacion }}</p>
      <p class="contenido-datos"> <b>Cantidad total:</b> {{ cantidad_total }}</p>
      <p class="contenido-datos"> <b>Valor total:</b> {{ valor_inventario }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
    id_inventario : String,
    fecha_actualizacion: String,
    cantidad_total: Number,
    valor_inventario: Number,
})
</script>

<style scoped>
.inventario-card {
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.info {
  display: flex;
  flex-direction: column;
}
.contenido-datos {
  font-size: 15px;
  color: #222730;
}
</style>