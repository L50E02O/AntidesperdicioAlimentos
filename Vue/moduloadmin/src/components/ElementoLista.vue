<template>
    <div class="elemento-lista">
        <div class="icono">
            <slot name="icono">
                <!-- Si no se pasa un slot, usa un ícono por defecto -->
                📊
            </slot>
        </div>
        <p>{{ nombreEstablecimiento }}</p>
        <p>{{ direccion }}</p>
        <p>{{ estado }}</p>
        <button class="boton" @click="onClick">ver</button>
    </div>
</template>

<script>
import { withDirectives } from 'vue';

export default{
    name: "ElementoLista",
    props: {
        nombreEstablecimiento:{
            type: String,
            required: true
        },
        direccion:{
            type: String,
            required: true
        },
        estado:{
            type: String,
            required: true
        }
    }
}

</script>

<style>
.elemento-lista {
    display: flex;
    height: 50px;
    width: 570px;
    gap: 10%;
    background: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border-radius: 6px;
}

.icono {
  font-size: 30px;
  margin-bottom: 10px;
}

.boton {
  margin:10px ;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.boton:hover {
  background: #2563eb;
}
</style>