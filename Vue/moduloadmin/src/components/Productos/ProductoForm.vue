<template>
  <div class="crear-producto">
    <h2>Registrar nuevo producto</h2>
    <form @submit.prevent="registrarProducto">

      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input v-model="form.nombre" id="nombre" type="text" maxlength="50" required />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripcion</label>
        <textarea v-model="form.descripcion" id="descripcion" maxlength="150" required></textarea>
      </div>

      <div class="form-group">
        <label for="precio">Precio</label>
        <input v-model="form.precio" id="precio" type="number" min="0" step="0.01" required />
      </div>

      <div class="form-group">
        <label for="stock">Stock</label>
        <input v-model="form.stock" id="stock" type="number" min="0" step="1" required />
      </div>

      <button type="submit">Registrar</button>
    </form>
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { insertarProducto } from '../../services/servicioProducto'

const route = useRoute()
const id_inventario = String(route.params.id)


const form = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  id_inventario: id_inventario
})

const mensaje = ref('')

async function registrarProducto() {
  try {
    await insertarProducto(form.value)
    mensaje.value = 'Producto registrado exitosamente.'
    form.value = { nombre: '', descripcion: '', precio: 0, stock: 0, id_inventario: id_inventario }
  } catch (error) {
    mensaje.value = 'Ocurrió un error al registrar el producto.'
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

input, textarea {
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