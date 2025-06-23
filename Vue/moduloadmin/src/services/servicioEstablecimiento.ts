// src/services/servicioEstablecimiento.ts
import { supabase } from '../config/supabase'
import type { Establecimiento } from '../types/establecimiento'

export async function obtenerEstablecimientosHabilitados(): Promise<Establecimiento[]> {
  const { data, error } = await supabase
    .from('establecimiento')
    .select('*')
    .order('id_establecimiento', { ascending: true })
    .eq('habilitado', true)

  if (error) {
    console.error('Error al obtener establecimientos habilitados:', error)
    throw error
  }

  return data || []
}

export async function obtenerEstablecimientosDeshabilitados(): Promise<Establecimiento[]> {
  const { data, error } = await supabase
    .from('establecimiento')
    .select('*')
    .order('id_establecimiento', { ascending: true })
    .eq('habilitado', false)

  if (error) {
    console.error('Error al obtener establecimientos deshabilitados:', error)
    throw error
  }

  return data || []
}

export async function habilitar(establecimiento: Establecimiento) {
  const { error } = await supabase
    .from('establecimiento')
    .update({ habilitado: true })
    .eq('id_establecimiento', establecimiento.id_establecimiento)

  if (error) throw error

  alert(`Establecimiento ${establecimiento.nombre} habilitado correctamente`)
}

export async function deshabilitar(establecimiento: Establecimiento) {
  const { error } = await supabase
    .from('establecimiento')
    .update({ habilitado: false })
    .eq('id_establecimiento', establecimiento.id_establecimiento)

  if (error) throw error

  alert(`Establecimiento ${establecimiento.nombre} deshabilitado correctamente`)
}

export async function eliminar(establecimiento: Establecimiento) {
  const { error } = await supabase
    .from('establecimiento')
    .delete()
    .eq('id_establecimiento', establecimiento.id_establecimiento)

  if (error) throw error

  alert(`Establecimiento ${establecimiento.nombre} eliminado correctamente`)
}
