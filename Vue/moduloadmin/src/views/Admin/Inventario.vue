<template>
    <div v-if = "inventario">
        <botonAtras @cambiarRuta="retroceder" />
        <h1>Inventario</h1>
        <InventarioCard
        :id_inventario = "inventario.id_inventario"
        :fecha_actualizacion = "inventario.fecha_actualizacion"
        :cantidad_total = "inventario.cantidad_total"
        :valor_inventario = "inventario.valor_inventario"
        />
        <h1>Productos</h1>
        <div class="productos">
            <RouterLink :to='`/producto-form/${inventario.id_inventario}`' class="btn-agregar">Agregar</RouterLink>
            <ProductoLista :productos = "inventario.productos"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerInventarioPorId } from '../../services/servicioInventario'
import type { Inventario } from '../../types/inventario'
import InventarioCard from "../../components/inventario/InventarioCard.vue"
import ProductoLista from "../../components/inventario/ProductoLista.vue"
import botonAtras from '../../components/botonAtras/BotonAtras.vue'
import router from '../../router'

const route = useRoute()
const idEstablecimiento = String(route.params.id)
console.log('ID del establecimiento:', idEstablecimiento)
const inventario = ref<Inventario | null>(null)

onMounted(async () => {
    try {
        inventario.value = await obtenerInventarioPorId(idEstablecimiento)
        console.log('Inventario:', inventario.value)
    } catch (error) {
        console.error('Error al obtener el inventario:', error)
    }
})

function retroceder(){
    router.push("/establecimientos");
}

</script>

<style>
.productos {
    display: flex;
    flex-direction: column;
}

.btn-agregar {
  align-self: flex-start;
  padding: 6px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 12px;
  text-decoration-line: none;
}

.btn-agregar:hover {
  background-color: #1f67db;
}
</style>