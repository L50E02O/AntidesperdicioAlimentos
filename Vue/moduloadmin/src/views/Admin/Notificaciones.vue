<template>
  <div class="notificaciones-view">
    <h1 class="titulo">Centro de notificaciones</h1>

    <div class="tabs">
      <button :class="{ active: activeTab === 'todas' }" @click="activeTab = 'todas'">Todas</button>
      <button :class="{ active: activeTab === 'noLeidas' }" @click="activeTab = 'noLeidas'">No leídas</button>
      <button :class="{ active: activeTab === 'importantes' }" @click="activeTab = 'importantes'">Importantes</button>
    </div>

    <section class="grupo">
      <h2>Hoy</h2>
      <NotificacionItem
        icon="🛎️"
        titulo="Nuevo reporte de desperdicio"
        descripcion="Panadería La Paz ha registrado un nuevo reporte."
        importante
      />
      <NotificacionItem
        icon="✅"
        titulo="Incidencia resuelta"
        descripcion="La incidencia en Frutería El Sol fue marcada como resuelta."
      />
    </section>

    <section class="grupo">
      <h2>Ayer</h2>
      <NotificacionItem
        icon="📋"
        titulo="Solicitud pendiente"
        descripcion="Mercado Verde tiene una solicitud sin revisar."
      />
      <NotificacionItem
        icon="🏪"
        titulo="Nuevo establecimiento"
        descripcion="Supermercado Norte fue agregado al sistema."
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NotificacionItem from '../../components/NotificacionItem.vue'

const activeTab = ref('todas')
</script>

<style scoped>
.notificaciones-view {
  max-width: 700px;
  margin: 0 auto;
}

.titulo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.tabs {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
}

.tabs button {
  background: none;
  border: none;
  font-weight: 500;
  padding: 0.5rem 0;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

.tabs button.active {
  border-bottom: 3px solid #333;
  color: #333;
}

.grupo h2 {
  margin-top: 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #555;
}
</style>
