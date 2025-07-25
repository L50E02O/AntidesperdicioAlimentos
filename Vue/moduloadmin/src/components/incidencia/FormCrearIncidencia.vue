<template>
  <div class="crear-incidencia">
    <botonAtras @cambiarRuta="router.push('/incidencias')" />
    <h2>Registrar nueva incidencia</h2>
    <form @submit.prevent="registrarIncidencia">
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea v-model="form.descripcion" id="descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input v-model="form.fecha" id="fecha" type="date" required />
      </div>

      <div class="form-group">
        <label for="estado">Estado</label>
        <select v-model="form.estado" id="estado" required>
          <option value="pendiente">Pendiente</option>
          <option value="abierto">Abierto</option>
          <option value="resuelto">Resuelto</option>
        </select>
      </div>

      <div class="form-group">
        <label for="id_comerciante">Comerciante</label>
        <select v-model="form.id_comerciante" id="id_comerciante">
          <option value="" disabled> Selecciona un Comerciante </option>
          <option v-for="comerciante in comercianteStore.comerciantes"
            :key="comerciante.id_comerciante"
            :value="comerciante.id_comerciante"
          > {{ comerciante.nombre }} ({{ comerciante.usuario }}) </option>
        </select>
      </div>

      <div class="form-group">
        <label for="id_cliente">Cliente</label>
        <select v-model="form.id_cliente" id="id_cliente">
          <option value="" disabled> Selecciona un Cliente </option>
          <option v-for="cliente in clientes"
            :key="cliente.id_cliente"
            :value="cliente.id_cliente"
          > {{ cliente.nombre }} ({{ cliente.usuario }}) </option>
        </select>
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { insertarIncidencia } from '../../services/servicioIncidencia'
import { useComercianteStore } from '../../stores/ComercianteStore'
import type { Cliente } from '../../types/cliente'
import { obtenerClientes } from '../../services/servicioCliente'
import botonAtras from '../botonAtras/BotonAtras.vue'
import router from '../../router'

const form = ref({descripcion: '', fecha: '', estado: 'pendiente', id_comerciante: '', id_cliente: ''})
const comercianteStore = useComercianteStore();
const mensaje = ref('')
const clientes = ref<Cliente[]>([]);

onMounted(async()=>{
  await comercianteStore.cargarComerciantes();
  clientes.value = await obtenerClientes();
});

async function registrarIncidencia() {
  try{
  await insertarIncidencia(form.value)
  mensaje.value = 'Incidencia registrada exitosamente.'
  form.value = {descripcion: '', fecha: '', estado: 'pendiente', id_comerciante: '', id_cliente: ''}
  }catch(error){
    mensaje.value = "Ocurrió un error al registrar el comerciante."
  }
}
</script>

<style scoped>
.crear-incidencia {
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #0056b3;
}

.mensaje {
  margin-top: 1rem;
  text-align: center;
  color: green;
  font-weight: bold;
}
</style>