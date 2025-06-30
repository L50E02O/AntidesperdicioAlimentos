import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Cliente } from '../types/cliente'

export async function obtenerClientes(): Promise<Cliente[]> {
  try{
    const url = `${SUPABASE_URL}/rest/v1/cliente`;
    const response = await fetch(url,{
      method: "GET",
      headers: SUPABASE_HEADERS,
    });
    if(!response.ok){
      throw new Error("Error al obtener los clientes");
    };
    const data = await response.json();
    return data;
  }catch(error){
    console.error("Error", error);
    throw error;
  }
}