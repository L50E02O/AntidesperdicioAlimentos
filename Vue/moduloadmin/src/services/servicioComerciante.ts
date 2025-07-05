import { SUPABASE_URL, SUPABASE_HEADERS } from '../config/supabaseRest'
import type { Comerciante } from '../types/comerciante'

export async function obtenerComerciantes(): Promise<Comerciante[]> {
  try{
    const url = `${SUPABASE_URL}/rest/v1/comerciante`;
    const response = await fetch(url,{
      method: "GET",
      headers: SUPABASE_HEADERS,
    });
    if(!response.ok){
      throw new Error("Error al obtener los comerciantes");
    };
    const data = await response.json();
    return data;
  }catch(error){
    console.error("Error", error);
    throw error;
  }
}

export async function actualizarComerciante(comerciante: Comerciante) {
  try{
    const url = `${SUPABASE_URL}/rest/v1/comerciante?id_comerciante=eq.${comerciante.id_comerciante}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify(comerciante),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el comerciante');
    }
  }catch(error){
    console.error('Error al actualizar comerciante:', error);
    throw error;  
  }
}

export async function eliminarComerciante(comerciante: Comerciante): Promise<void> {
  try {
    // Primero se eliminan los establecimientos del comerciante
    const urlEstablecimientos = `${SUPABASE_URL}/rest/v1/establecimiento?id_comerciante=eq.${comerciante.id_comerciante}`;
    const responseEst = await fetch(urlEstablecimientos, {
      method: 'DELETE',
      headers: SUPABASE_HEADERS,
    });
    if (!responseEst.ok) {
      throw new Error('Error al eliminar los establecimientos del comerciante')
    }
    // Luego se elimina el comerciante
    const urlComerciante = `${SUPABASE_URL}/rest/v1/comerciante?id_comerciante=eq.${comerciante.id_comerciante}`;
    const responseCom = await fetch(urlComerciante, {
      method: 'DELETE',
      headers: SUPABASE_HEADERS,
    });
    if (!responseCom.ok) {
      throw new Error('Error al eliminar el comerciante');
    };
  } catch (error) {
    console.error('Error en eliminar:', error);
    throw error;
  }
}

export async function insertarComerciante(nuevo: Omit<Comerciante, 'habilitado' | 'id_comerciante'>): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/comerciante`
    const response = await fetch(url, {
      method: 'POST',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify({
        ...nuevo,
        habilitado: false // valor por defecto
      }),
    })
    if (!response.ok) {
      throw new Error('Error al insertar comerciante')
    }
  } catch (error) {
    console.error('Error en insertar comerciante:', error)
    throw error
  }
}