import { supabase } from '../config/supabase'
import type { Incidencia } from '../types/incidencia'

/* Obtener todas las incidencias */
export async function obtenerTodasIncidencias(): Promise<Incidencia[]> {
  const { data, error } = await supabase
    .from('incidencia')
    .select('*')
    .order('fecha', { ascending: false })

  if (error) throw error
  return data as Incidencia[]
}

/* Actualizar estado */
export async function actualizarEstadoIncidencia(
  id: number,
  estado: string
): Promise<void> {
  const { error } = await supabase
    .from('incidencia')
    .update({ estado })
    .eq('id_incidencia', id)

  if (error) throw error
}

/* Eliminar incidencia */
export async function eliminarIncidencia(id: number): Promise<void> {
  const { error } = await supabase
    .from('incidencia')
    .delete()
    .eq('id_incidencia', id)

  if (error) throw error
}

export async function insertarIncidencia(incidencia: {
  descripcion: string,
  fecha: string,
  estado: string,
  id_comerciante: string,
  id_cliente: string
}) {
  const { error } = await supabase
    .from('incidencia')
    .insert([incidencia])

  if (error) throw error
}
