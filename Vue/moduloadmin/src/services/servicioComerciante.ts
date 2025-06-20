// src/services/servicioComerciante.ts
import { supabase } from '../config/supabase'
import type { Comerciante } from '../types/comerciante'

export async function obtenerComerciantesHabilitados(): Promise<Comerciante[]> {
  const { data, error } = await supabase
    .from('comerciante')
    .select('*')
    .eq('habilitado', true)
    .order('id_comerciante', { ascending: true })

  if (error) {
    console.error('Error al obtener comerciantes habilitados:', error)
    return []
  }

  return data as Comerciante[]
}

export async function obtenerComerciantesDeshabilitados(): Promise<Comerciante[]> {
  const { data, error } = await supabase
    .from('comerciante')
    .select('*')
    .eq('habilitado', false)
    .order('id_comerciante', { ascending: true })

  if (error) {
    console.error('Error al obtener comerciantes deshabilitados:', error)
    return []
  }

  return data as Comerciante[]
}

export async function habilitar(comerciante: Comerciante): Promise<void> {
  const { error } = await supabase
    .from('comerciante')
    .update({ habilitado: true })
    .eq('id_comerciante', comerciante.id_comerciante)

  if (error) {
    console.error('No se pudo habilitar el comerciante:', error)
    throw error
  }
}

export async function deshabilitar(comerciante: Comerciante): Promise<void> {
  const { error } = await supabase
    .from('comerciante')
    .update({ habilitado: false })
    .eq('id_comerciante', comerciante.id_comerciante)

  if (error) {
    console.error('No se pudo deshabilitar el comerciante:', error)
    throw error
  }
}

export async function eliminar(comerciante: Comerciante): Promise<void> {
  // Eliminar establecimientos relacionados primero
  const { error: errorEstablecimientos } = await supabase
    .from('establecimiento')
    .delete()
    .eq('id_comerciante', comerciante.id_comerciante)

  if (errorEstablecimientos) {
    console.error('Error al eliminar los establecimientos del comerciante:', errorEstablecimientos)
    throw errorEstablecimientos
  }

  // Luego eliminar el comerciante
  const { error: errorComerciante } = await supabase
    .from('comerciante')
    .delete()
    .eq('id_comerciante', comerciante.id_comerciante)

  if (errorComerciante) {
    console.error('No se pudo eliminar el comerciante:', errorComerciante)
    throw errorComerciante
  }
}

export async function insertarComerciante(nuevo: Omit<Comerciante, 'habilitado'>): Promise<void> {
  const { error } = await supabase
    .from('comerciante')
    .insert([{ ...nuevo, habilitado: false }]) // `habilitado` FALSE por defecto

  if (error) {
    console.error('Error al insertar comerciante:', error)
    throw error
  }
}