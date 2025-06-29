<template>
    <div class="productos-lista">
        <ProductoRow v-for = "(producto, id_producto) in productos"
            :key = "id_producto"
            :nombre = "producto.nombre"
            :descripcion = "producto.descripcion"
            :precio = "producto.precio"
            :stock = "producto.stock"
        />
    </div>
</template>

<script setup lang="ts">
import ProductoRow from "./ProductoRow.vue";
import type { Producto } from "../../types/producto";

const { productos } = defineProps<{
    productos: Producto[]
}>()
</script>

<style scoped>
.productos-lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>