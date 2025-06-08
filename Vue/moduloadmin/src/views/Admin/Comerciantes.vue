<template>
  <div>
    <h2 class="title">Lista de Comerciantes</h2>
    <div class="cards-container">
      <ComercianteCard
        v-for="comerciante in comerciantes"
        :key="comerciante.id_comerciante"
        :nombre="comerciante.nombre"
        :direccion="comerciante.direccion"
        :telefono="comerciante.telefono"
        :email="comerciante.email"
        :estado="comerciante.habilitado ? 'Habilitado' : 'Deshabilitado'"
        @aprobar="aprobarComerciante(comerciante.id_comerciante)"
        @rechazar="rechazarComerciante(comerciante.id_comerciante)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComercianteCard from '../../components/ComercianteCard.vue'
import type {Comerciante} from '../../types/comerciante'

const comerciantes: Comerciante[] = [
  {id_comerciante: "1234567890", nombre: 'Juan Pérez', direccion: 'Mercado Central, Av. Libertad 123', telefono: '987654321', email: 'juan@gmail.com', habilitado: false},
  {id_comerciante: "0987654321", nombre: 'María López', direccion: 'Plaza Mayor, Calle Real 456', telefono: '123456789', email: 'maria@gmail.com', habilitado: false},
  {id_comerciante: "1122334455", nombre: 'Carlos García', direccion: 'Barrio Nuevo, Av. Sol 789', telefono: '456789123', email: 'carlos@gmail.com', habilitado: false},
  {id_comerciante: "5566778899", nombre: 'Ana Torres', direccion: 'Zona Industrial, Calle Fuerte 321', telefono: '321654987', email: 'ana@gmail.com', habilitado: false}
]

const aprobarComerciante = (id:string) => {
  console.log(`Aprobado comerciante ID ${id}`)
  // lógica para aprobar
}

const rechazarComerciante = (id:string) => {
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
