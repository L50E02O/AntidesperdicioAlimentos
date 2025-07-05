<template>
  <div class="crear-comerciante">
    <botonAtras @cambiarRuta="$router.push('/comerciantes')" />
    <h2>Registrar nuevo comerciante</h2>
    <form @submit.prevent="registrarComerciante">

      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input v-model="form.nombre" id="nombre" type="text" maxlength="50" required />
      </div>

      <div class="form-group">
        <label for="usuario">Usuario</label>
        <input v-model="form.usuario" id="usuario" type="text" maxlength="15" required />
      </div>

      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input v-model="form.direccion" id="direccion" type="text" maxlength="100" required />
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input v-model="form.telefono" id="telefono" type="text" maxlength="20" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" id="email" type="email" maxlength="100" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input v-model="form.password" id="password" type="password" maxlength="100" required />
      </div>

      <button type="submit">Registrar</button>
    </form>
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { insertarComerciante } from '../../services/servicioComerciante'
import botonAtras from '../botonAtras/botonAtras.vue'

const form = ref({
  nombre: '',
  usuario: '',
  direccion: '',
  telefono: '',
  email: '',
  password: '',
})

const mensaje = ref('')

async function registrarComerciante() {
  try {
    await insertarComerciante(form.value)
    mensaje.value = 'Comerciante registrado exitosamente.'
    form.value = { nombre: '', usuario: '', direccion: '', telefono: '', email: '', password: ''}
  } catch (error) {
    mensaje.value = 'Ocurrió un error al registrar el comerciante.'
    console.error(error)
  }
}
</script>

<style scoped>
.crear-comerciante {
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

input {
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