<template>
  <div class="notificacion-row">
    <div class="contenido">
      <p class="mensaje">{{ mensaje }}</p>
      <p class="fecha">{{ fechaEnvio }}</p>
    </div>
    <button class="accion" @click="$emit('accion')">{{textoBoton}}</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  mensaje: string
  fechaEnvio: string
  textoBoton: string
}>()

// const fechaLocal = ref(props.fechaEnvio)

// watch(() => props.fechaEnvio, (nuevaFecha) => {
//   fechaLocal.value = nuevaFecha
// })
</script>

<style scoped>
.notificacion-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff; /* gris suave */
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contenido {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mensaje {
  font-weight: 500;
  font-size: 16px;
  color: #111827; /* gris oscuro */
}

.fecha {
  font-size: 14px;
  color: #6b7280; /* gris medio */
}

.accion {
  background-color: #3b82f6; /* rojo */
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.accion:hover {
  background-color: #3971f4;
}
</style>