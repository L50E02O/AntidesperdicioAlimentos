<template>
    <div class="contenido">

      <h1>Resumen general</h1>
      <div class="resumen-general">
        <ResumenCard
          titulo="Activos"
          subtitulo="Establecimientos"
          cantidad="24 activos"
          textoBoton="Ver todos"
          @boton-click="verEstablecimientos">

          <template #icono>
            
          </template>
        </ResumenCard>

        <ResumenCard
          titulo="Solicitudes"
          subtitulo="Pendientes"
          cantidad="5 nuevas"
          textoBoton="Ver todos"
          @boton-click="revisarSolicitudes">
          <template #icono>
            📄
          </template>
        </ResumenCard>

          <ResumenCard
          titulo="Incidencias"
          subtitulo="Pendientes"
          cantidad="3 sin ressolver"
          textoBoton="Ver todos"
          @boton-click="revisarSolicitudes">
          <template #icono>
            📄
          </template>
        </ResumenCard>

        <ResumenCard
          titulo="Solicitudes"
          subtitulo="Pendientes"
          cantidad="5 nuevas"
          textoBoton="Ver todos"
          @boton-click="revisarSolicitudes">
          <template #icono>
            📄
          </template>
        </ResumenCard>
      </div>

      <h1>Solicitudes recientes</h1>
      <div class="solicidudes-recientes">
        <ElementoLista
          nombreEstablecimiento="Panadería"
          direccion="Av. Central 123"
          estado="Pendiente">

          <template #icono>

          </template>
        </ElementoLista>

        <ElementoLista
          nombreEstablecimiento="Panadería"
          direccion="Av. Central 123"
          estado="Pendiente">

          <template #icono>

          </template>
        </ElementoLista>
      </div>
    </div>
</template>

<script>
import ResumenCard from '../../components/ResumenCard.vue';
import LayoutSidebar from '../../layouts/LayoutSidebar.vue';
import ElementoLista from '../../components/ElementoLista.vue';

export default {
    components: {
    ResumenCard,
    LayoutSidebar,
    ElementoLista,
  },

  methods: {
    verEstablecimientos() {
      console.log('Ver todos los establecimientos')
    },

    revisarSolicitudes() {
      console.log('Revisar solicitudes pendientes')
    }
  }
}
</script>

<style>
.contenido{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.resumen-general {
  display: flex;
  width: 100%;
  border-radius: 12px;
}

.solicidudes-recientes {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px ;
}
</style>