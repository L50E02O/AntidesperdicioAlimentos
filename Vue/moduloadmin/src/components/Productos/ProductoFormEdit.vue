<template>
  <div class="editar-producto">
    <botonAtras @cambiarRuta="$router.push('/inventario/' + form.id_inventario)" />
    <h2>Editar producto</h2>
    <form @submit.prevent="guardarCambiosProducto">

      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input v-model="form.nombre" id="nombre" type="text" maxlength="50" required  />
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

      <button type="submit">Guardar cambios</button>
    </form>
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { actualizarProducto} from '../../services/servicioProducto'
import router from '../../router'
import botonAtras from '../botonAtras/botonAtras.vue'

const rout = useRoute()
onMounted(async () => {
    form.value = {
        id_producto: String(rout.params.id),
        nombre: String(rout.params.nombre),
        descripcion: String(rout.params.descripcion),
        precio: Number(rout.params.precio),
        stock: Number(rout.params.stock),
        id_inventario: String(rout.params.id_inventario) 
    }
    console.log(String(rout.params.id_inventario))
    console.log(form.value)
})

const form = ref({
    id_producto: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    id_inventario: "",
})

const mensaje = ref('')

async function guardarCambiosProducto() {
  try {
    await actualizarProducto(form.value)
    mensaje.value = 'Los cambios se guardaron correctamente.'
    router.push({name:"inventario", params:{id: String(rout.params.id_inventario)}})
  } catch (error) {
    mensaje.value = 'Ocurrió un error al guardar los cambios.'
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