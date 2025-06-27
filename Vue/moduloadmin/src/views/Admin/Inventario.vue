<template>
    <div>
        <h1>Inventario</h1>
        <div v-if="inventario">
            <p> ID: {{inventario.id_inventario}} </p>
            <p> Fecha de actualizacion: {{ inventario.fecha_actualizacion }} </p>
            <p> cantidad de productos: {{ inventario.cantidad_total }}</p>
            <p> valor total: {{ inventario.valor_inventario }}</p>
            <p> Productos: </p>
            <ul>
                <li v-for="(producto, id_producto ) in inventario.productos" :key="id_producto">
                {{ producto.nombre }} - ${{ producto.precio }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerInventarioPorId } from '../../services/servicioInventario'
import type { Inventario } from '../../types/inventario'

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

</script>

<style>

</style>