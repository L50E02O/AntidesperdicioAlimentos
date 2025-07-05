import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Producto } from '../types/producto'

export async function actualizarProducto(Producto: Producto) {
  try{
    const url = `${SUPABASE_URL}/rest/v1/producto?id_producto=eq.${Producto.id_producto}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify([Producto]),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }
  }catch(error){
    console.error('Error al actualizar producto:', error);
    throw error;  
  }
}

export async function eliminarProducto(Producto: Producto): Promise<void> {
  try {
    console.log("esta función si se ejecutó");
    console.log(Producto.id_producto);
    const url = `${SUPABASE_URL}/rest/v1/producto?id_producto=eq.${Producto.id_producto}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: SUPABASE_HEADERS,
    })
    if (!response.ok) {
      throw new Error('Error al eliminar la producto')
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

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