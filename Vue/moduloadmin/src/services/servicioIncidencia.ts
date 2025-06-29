import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Incidencia } from '../types/incidencia'

/* Obtener todas las incidencias */
export async function obtenerTodasIncidencias(): Promise<Incidencia[]> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/incidencia?order=fecha.desc`

    const response = await fetch(url, {
      method: 'GET',
      headers: SUPABASE_HEADERS,
    })

    if (!response.ok) {
      throw new Error('Error al obtener las incidencias')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

/* Actualizar estado */
export async function actualizarEstadoIncidencia(
  id: string,
  estado: string
): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/incidencia?id_incidencia=eq.${id}`

    const response = await fetch(url, {
      method: 'PATCH',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify({ estado }),
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el estado de la incidencia')
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

/* Eliminar incidencia */
export async function eliminarIncidencia(id: string): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/incidencia?id_incidencia=eq.${id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: SUPABASE_HEADERS,
    })

    if (!response.ok) {
      throw new Error('Error al eliminar la incidencia')
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function insertarIncidencia(incidencia: {
  descripcion: string
  fecha: string
  estado: string
  id_comerciante: string
  id_cliente: string
}): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/incidencia`

    const response = await fetch(url, {
      method: 'POST',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify([incidencia]), // Se envía como array de objetos
    })

    if (!response.ok) {
      throw new Error('Error al insertar la incidencia')
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

