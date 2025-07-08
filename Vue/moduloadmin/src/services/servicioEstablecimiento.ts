import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Establecimiento } from '../types/establecimiento'

export async function obtenerEstablecimientos(): Promise<Establecimiento[]>{
  try {
    const url = `${SUPABASE_URL}/rest/v1/establecimiento`

    const response = await fetch(url, {
      method: 'GET',
      headers: SUPABASE_HEADERS,
    })

    if (!response.ok) {
      throw new Error('Error al obtener los establecimientos')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function actualizarEstablecimiento(establecimiento: Establecimiento) {
  try{
    const url = `${SUPABASE_URL}/rest/v1/establecimiento?id_establecimiento=eq.${establecimiento.id_establecimiento}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify(establecimiento),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el establecimiento');
    }
  }catch(error){
    console.error('Error al actualizar establecimiento:', error);
    throw error;  
  }
}

export async function eliminarEstablecimiento(establecimiento: Establecimiento): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/establecimiento?id_establecimiento=eq.${establecimiento.id_establecimiento}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: SUPABASE_HEADERS,
    })

    if (!response.ok) {
      throw new Error('Error al eliminar el establecimiento')
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}