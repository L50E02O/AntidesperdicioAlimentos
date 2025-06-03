<template>
  <div class="row">
    <div>{{ incidencia.fecha }}</div>
    <div>{{ incidencia.cliente_nombre }}</div>
    <div>{{ incidencia.comerciante_nombre }}</div>
    <div>{{ incidencia.estado }}</div>
    <div>
      <button @click="$emit('toggle', incidencia.id_incidencia)">
        {{ abierta ? 'Ocultar' : 'Ver más' }}
      </button>
    </div>

    <div v-if="abierta" class="detalle">
      <p><strong>Descripción:</strong> {{ incidencia.descripcion }}</p>
      <div class="estado-buttons">
        <button @click="$emit('cambiarEstado', incidencia.id_incidencia, 'abierto')">🔓 Abierto</button>
        <button @click="$emit('cambiarEstado', incidencia.id_incidencia, 'pendiente')">🕓 Pendiente</button>
        <button @click="$emit('cambiarEstado', incidencia.id_incidencia, 'resuelto')">✅ Resuelto</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  incidencia: Object,
  abierta: Boolean
})

defineEmits(['toggle', 'cambiarEstado'])
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr auto;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ddd;
  align-items: center;
}
.detalle {
  grid-column: 1 / -1;
  background: #f9f9f9;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 8px;
}
.estado-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.estado-buttons button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.estado-buttons button:nth-child(1) {
  background-color: #fde68a;
}
.estado-buttons button:nth-child(2) {
  background-color: #93c5fd;
}
.estado-buttons button:nth-child(3) {
  background-color: #86efac;
}
</style>
