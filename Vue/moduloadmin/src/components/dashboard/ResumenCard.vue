<template>
  <div class="resumen-card">
    <div class="icono">
      <slot name="icono">
        📊
      </slot>
    </div>
    <div class="contenido">
      <p class="titulo">{{ titulo }}</p>
      <h2 class="subtitulo">{{ subtitulo }}</h2>
      <button class="boton" @click="onClick">{{ textoBoton }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    titulo: String,
    subtitulo: String,
    textoBoton: String
  })
  
  const emit = defineEmits(['boton-click'])
  const onClick = () => {
    emit('boton-click')
  }

</script>

<style scoped>
.resumen-card {
  flex: 1;
  min-width: 0;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 220px;
  height: auto;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.icono {
  font-size: 30px;
  margin-bottom: 10px;
}
.titulo {
  font-size: 14px;
  color: #555;
  margin: 0;
}
.subtitulo {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
}
.cantidad {
  font-size: 12px;
  color: #888;
}
.boton {
  margin-top: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.boton:hover {
  background: #2563eb;
}
</style>
