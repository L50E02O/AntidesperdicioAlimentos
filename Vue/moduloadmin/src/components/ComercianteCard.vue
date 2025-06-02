<template>
  <div class="comerciante-card">
    <div class="avatar-placeholder"></div>
    <div class="info">
      <h3>{{ nombre }}</h3>
      <p class="direccion">{{ establecimiento }}</p>
      <p class="estado">Estado: <span class="pendiente">Pendiente</span></p>
      <div class="acciones">
        <button class="btn aprobar" @click="$emit('aprobar')">Aprobar</button>
        <button class="btn rechazar" @click="$emit('rechazar')">Rechazar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombre: String,
  establecimiento: String,
})
</script>

<style scoped>
.comerciante-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  flex-direction: column;
  text-align: center;
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  background-color: #3b82f6;
  border-radius: 50%;
}

.info h3 {
  margin: 0.5rem 0 0.2rem;
  font-size: 1.1rem;
}

.direccion, .estado {
  font-size: 0.875rem;
  color: #666;
}

.acciones {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.aprobar {
  background-color: #3b82f6;
  color: white;
}

.rechazar {
  background-color: #e0e7ff;
  color: #3b82f6;
}
</style>