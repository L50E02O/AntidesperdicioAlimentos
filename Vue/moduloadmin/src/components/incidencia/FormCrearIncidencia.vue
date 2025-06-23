<template>
  <div class="crear-incidencia">
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
        <label for="id_comerciante">ID Comerciante</label>
        <input v-model="form.id_comerciante" id="id_comerciante" type="text" maxlength="10" required />
      </div>

      <div class="form-group">
        <label for="id_cliente">ID Cliente</label>
        <input v-model="form.id_cliente" id="id_cliente" type="text" maxlength="10" required />
      </div>

      <button type="submit">Registrar</button>
    </form>
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { insertarIncidencia } from '../../services/servicioIncidencia'

const form = ref({
  descripcion: '',
  fecha: '',
  estado: 'pendiente',
  id_comerciante: '',
  id_cliente: '',
})

const mensaje = ref('')

async function registrarIncidencia() {
  try {
    await insertarIncidencia(form.value)
    mensaje.value = 'Incidencia registrada exitosamente.'
    form.value = {
      descripcion: '',
      fecha: '',
      estado: 'pendiente',
      id_comerciante: '',
      id_cliente: '',
    }
  } catch (error) {
    mensaje.value = 'Ocurrió un error al registrar la incidencia.'
    console.error(error)
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

input,
textarea,
select {
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