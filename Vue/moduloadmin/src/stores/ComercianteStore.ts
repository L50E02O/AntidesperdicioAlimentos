import { defineStore } from 'pinia'
import { obtenerComerciantes, eliminarComerciante, actualizarComerciante, insertarComerciante } from '../services/servicioComerciante'
import type { Comerciante } from '../types/comerciante'
import { ref } from 'vue'


export const useComercianteStore = defineStore(
  "Comerciante", () => {
    const comerciantes = ref<Comerciante[]>([])
    const cargado = ref(false)

    async function cargarComerciantes() {
      if(!cargado.value){
        comerciantes.value = await obtenerComerciantes();
        cargado.value = true;
      }
    }

    async function eliminarComercianteStore(comerciante: Comerciante) {
      try{
        await eliminarComerciante(comerciante);
        comerciantes.value = comerciantes.value.filter(c => c.id_comerciante !== comerciante.id_comerciante);
      }catch(error){
        console.error("Error al eliminar el comerciante", error);
      }
    }

    async function actualizarComercianteStore(comerciante: Comerciante){
      try{
        await actualizarComerciante(comerciante);
        comerciantes.value = comerciantes.value.map((c)=>{
          if(c.id_comerciante === comerciante.id_comerciante){
            return comerciante;
          }else{
            return c;
          }
        });
      }catch(error){
          console.error("Error al actualizar el comerciante",error);
      }
    }

    async function crearComercianteStore(comerciante: Omit<Comerciante, 'habilitado' | 'id_comerciante'>){
      try{
        const comercianteIncertado: Comerciante =  await insertarComerciante(comerciante);
        comerciantes.value.unshift(comercianteIncertado);
      }catch(error){
        console.error("Error al insertar un comerciante", error);
      }
    }

    return {comerciantes, cargado, cargarComerciantes, eliminarComercianteStore, actualizarComercianteStore, crearComercianteStore}
  },
);