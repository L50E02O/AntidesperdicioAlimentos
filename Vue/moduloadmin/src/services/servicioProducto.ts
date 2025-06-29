import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Producto } from '../types/producto'

export async function insertarProducto(producto: Omit<Producto, 'id_producto'>): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/producto`

    const response = await fetch(url, {
      method: 'POST',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify(producto),
    })

    if (!response.ok) {
      throw new Error('Error al insertar el producto')
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}