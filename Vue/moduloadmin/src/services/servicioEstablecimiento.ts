import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Establecimiento } from '../types/establecimiento'

export async function obtenerEstablecimientosHabilitados(): Promise<Establecimiento[]> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/establecimiento?habilitado=eq.true&order=id_establecimiento.asc`

    const response = await fetch(url, {
      method: 'GET',
      headers: SUPABASE_HEADERS,
    })

    if (!response.ok) {
      throw new Error('Error al obtener establecimientos habilitados')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function obtenerEstablecimientosDeshabilitados(): Promise<Establecimiento[]> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/establecimiento?habilitado=eq.false&order=id_establecimiento.asc`

    const response = await fetch(url, {
      method: 'GET',
      headers: SUPABASE_HEADERS,
    })

    if (!response.ok) {
      throw new Error('Error al obtener establecimientos deshabilitados')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}


export async function habilitar(establecimiento: Establecimiento): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/establecimiento?id_establecimiento=eq.${establecimiento.id_establecimiento}`

    const response = await fetch(url, {
      method: 'PATCH',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify({ habilitado: true }),
    })

    if (!response.ok) {
      throw new Error('Error al habilitar el establecimiento')
    }

    alert(`Establecimiento ${establecimiento.nombre} habilitado correctamente`)
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}


export async function deshabilitar(establecimiento: Establecimiento): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/establecimiento?id_establecimiento=eq.${establecimiento.id_establecimiento}`

    const response = await fetch(url, {
      method: 'PATCH',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify({ habilitado: false }),
    })

    if (!response.ok) {
      throw new Error('Error al deshabilitar el establecimiento')
    }

    alert(`Establecimiento ${establecimiento.nombre} deshabilitado correctamente`)
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}


export async function eliminar(establecimiento: Establecimiento): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/establecimiento?id_establecimiento=eq.${establecimiento.id_establecimiento}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: SUPABASE_HEADERS,
    })

    if (!response.ok) {
      throw new Error('Error al eliminar el establecimiento')
    }

    alert(`Establecimiento ${establecimiento.nombre} eliminado correctamente`)
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}


