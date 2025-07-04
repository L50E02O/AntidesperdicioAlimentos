<template>
    <div class="productos-lista">
        <ProductoRow v-for = "(producto, id_producto) in productos"
            :key = "id_producto"
            :nombre = "producto.nombre"
            :descripcion = "producto.descripcion"
            :precio = "producto.precio"
            :stock = "producto.stock"
            @editar="toEditProducto(producto)"
            @eliminar="eliminarProducto(producto)"
        />
    </div>
</template>

<script setup lang="ts">
import ProductoRow from "./ProductoRow.vue";
import type { Producto } from "../../types/producto";
import { eliminarProducto } from "../../services/servicioProducto";
import router from "../../router";

const { productos } = defineProps<{productos: Producto[]}>()
function toEditProducto(p: Producto){
    router.push({
        name: "producto-editar",
        params:{id: p.id_producto, nombre:p.nombre, descripcion:p.descripcion, precio:p.precio, 
            stock:p.stock, id_inventario:p.id_inventario}
    })
}
</script>

<style scoped>
.productos-lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>