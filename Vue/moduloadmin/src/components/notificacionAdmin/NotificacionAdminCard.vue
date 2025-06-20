<template>
  <div class="notificacion-card">
    <div class="contenido">
      <p class="mensaje">{{ mensaje }}</p>
      <p class="fecha">{{ fechaEnvio }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  mensaje: string
  fechaEnvio: string
}>()

const fechaLocal = ref(props.fechaEnvio)

watch(() => props.fechaEnvio, (nuevaFecha) => {
  fechaLocal.value = nuevaFecha
})
</script>

<style scoped>
.notificacion-card {
  background-color: #ffffff;
  border-left: 4px solid #007BFF;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.contenido {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.mensaje {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.fecha {
  font-size: 0.875rem;
  color: #777;
}
</style>