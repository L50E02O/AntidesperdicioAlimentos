import { supabase } from '../config/supabase'
import type { NotificacionAdmin } from '../types/notificacionAdmin'

export async function obtenerNotificacionesAdmin(): Promise<NotificacionAdmin[]> {
  const { data, error } = await supabase
    .from('notificacion_admin')
    .select('*')
    .order('fecha_envio', { ascending: false })

  if (error) {
    console.error('Error al obtener notificaciones:', error)
    return []
  }

  return data || []
}
