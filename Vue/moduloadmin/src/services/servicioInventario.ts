import { supabase } from '../config/supabase'
import type { Inventario } from '../types/inventario'


export async function obtenerInventarioPorId(id_inventario: string): Promise<Inventario> {
  const { data, error } = await supabase
    .from('inventario')
    .select('*, producto(*)')
    .eq('id_inventario', id_inventario)
    .single()

  if (error) {
    console.error('Error al obtener inventario por ID:', error)
    throw error
  }
  
  const { producto, ...resto} = data || {}

  const inventario: Inventario = {
    ...resto,
    productos: data.producto || []
  }

  return inventario
}