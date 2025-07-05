import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { NotificacionAdmin } from '../types/notificacionAdmin'

export async function obtenerNotificacionesAdmin(): Promise<NotificacionAdmin[]> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/notificacion_admin?order=fecha_envio.desc`
    const response = await fetch(url, {
      method: 'GET',
      headers: SUPABASE_HEADERS,
    })
    if (!response.ok) {
      throw new Error('Error al obtener las notificaciones')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al obtener notificaciones:', error)
    return []
  }
}

export async function eliminarNotificacionAdmin(notificacionAdmin: NotificacionAdmin): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/notificacion_admin?id_notificacion=eq.${notificacionAdmin.id_notificacion}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: SUPABASE_HEADERS,
    })
    if (!response.ok) {
      throw new Error('Error al eliminar la notificacionAdmin')
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}