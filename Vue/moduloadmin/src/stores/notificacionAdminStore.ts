import { defineStore } from 'pinia'
import { obtenerNotificacionesAdmin, eliminarNotificacionAdmin } from '../services/servicioNotificacionAdmin'
import type { NotificacionAdmin } from '../types/notificacionAdmin'
import { ref } from 'vue'


export const useNotificacionesAdminStore = defineStore(
  "notificacionesAdmin", () => {
    const notificacionesAdmin = ref<NotificacionAdmin[]>([])
    const cargado = ref(false)

    async function cargarNotificaciones() {
      if(!cargado.value){
        notificacionesAdmin.value = await obtenerNotificacionesAdmin();
        cargado.value = true;
      }
    }

    async function eliminarNotificacion(notificacionAdmin: NotificacionAdmin) {
      try{
        await eliminarNotificacionAdmin(notificacionAdmin);
        notificacionesAdmin.value = notificacionesAdmin.value.filter(notif => notif.id_notificacion !== notificacionAdmin.id_notificacion);
      }catch(error){
        console.error("Error al eliminar la notificación", error);
      }
    }
    return {notificacionesAdmin, cargado, cargarNotificaciones, eliminarNotificacion}
  }
);