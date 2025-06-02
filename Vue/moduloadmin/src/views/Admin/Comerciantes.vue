<template>
  <div>
    <!-- <nav class="breadcrumb">
      <span>Dashboard</span> &gt; <span>Comerciantes</span>
    </nav> -->
    <h2 class="title">Lista de Comerciantes</h2>
    <div class="cards-container">
      <ComercianteCard
        v-for="comerciante in comerciantes"
        :key="comerciante.id"
        :nombre="comerciante.nombre"
        :establecimiento="comerciante.establecimiento"
        @aprobar="aprobarComerciante(comerciante.id)"
        @rechazar="rechazarComerciante(comerciante.id)"
      />
    </div>
  </div>
</template>

<script setup>
import ComercianteCard from '../../components/ComercianteCard.vue'

const comerciantes = [
  { id: 1, nombre: 'Juan Pérez', establecimiento: 'Mercado Central, Av. Libertad 123' },
  { id: 2, nombre: 'Ana Gómez', establecimiento: 'Tienda Verde, Calle 45 #10' },
  { id: 3, nombre: 'Carlos Ruiz', establecimiento: 'Frutería Ruiz, Av. Sol 77' },
  { id: 4, nombre: 'Lucía Torres', establecimiento: 'Panadería Dulce, Calle Luna 8' },
  { id: 5, nombre: 'Miguel Ángel', establecimiento: 'Verduras Frescas, Av. Norte 22' },
]

const aprobarComerciante = (id) => {
  console.log(`Aprobado comerciante ID ${id}`)
  // lógica para aprobar
}

const rechazarComerciante = (id) => {
  console.log(`Rechazado comerciante ID ${id}`)
  // lógica para rechazar
}
</script>

<style scoped>
.breadcrumb {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
</style>
