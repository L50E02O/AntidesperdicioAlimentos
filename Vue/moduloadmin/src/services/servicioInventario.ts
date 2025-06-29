import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Inventario } from '../types/inventario'


export async function obtenerInventarioPorId(id_inventario: string): Promise<Inventario>{
  try{
    const url = `${SUPABASE_URL}/rest/v1/inventario?id_inventario=eq.${id_inventario}&select=*,producto(*)`;

    const response = await fetch(url, {
      method: "GET",
      headers: SUPABASE_HEADERS,
    });

    if(!response.ok){
      throw new Error("Error al obtener el inventario");
    };

    const data = await response.json();

    if(data.length === 0){
      throw new Error("Error al obtener el inventario");
    };

    const raw = data[0];
    const { producto, ...resto } = raw;

    return {
      ...resto, productos: producto || [],
    };


  } catch(error){
    console.error("Error", error);
    throw error;
  }
}