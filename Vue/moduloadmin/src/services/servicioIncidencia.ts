import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Incidencia } from '../types/incidencia'

export async function obtenerIncidencias(): Promise<Incidencia[]> {
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

export async function actualizarIncidencia(incidencia: Incidencia) {
  try{
    const url = `${SUPABASE_URL}/rest/v1/incidencia?id_incidencia=eq.${incidencia.id_incidencia}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify(incidencia),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el incidencia');
    }
  }catch(error){
    console.error('Error al actualizar incidencia:', error);
    throw error;  
  }
}

export async function eliminarIncidencia(incidencia: Incidencia): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/incidencia?id_incidencia=eq.${incidencia.id_incidencia}`
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

export async function insertarIncidencia(incidencia: Omit<Incidencia, 'id_incidencia'>): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/incidencia`

    const response = await fetch(url, {
      method: 'POST',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify(incidencia),
    })

    if (!response.ok) {
      throw new Error('Error al insertar la incidencia')
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

