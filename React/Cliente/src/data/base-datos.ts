import { createClient } from '@supabase/supabase-js';
import type { Producto } from '../types/productoT';
import type { Establecimiento } from '../types/establecimientoT';

const supabaseUrl = 'https://ghnczjiqciwtjwnpqexg.supabase.co';  // tu URL aquí (ver en API Docs > URL o en Project Overview)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdobmN6amlxY2l3dGp3bnBxZXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MjIyOTQsImV4cCI6MjA2NDQ5ODI5NH0.nV_PXemJ_-NIt6qZZRLLfvSptcE4cObVdAm5zBaQq98';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getProducts = async (): Promise<Producto[]> => {
  const { data, error } = await supabase
    .from('producto')
    .select('*');

  if (error) {
    console.error('Error:', error.message);
    return [];
  } else {
    return data;
  }
};
import type { cliente } from '../types/clienteT';
export const getClientes = async (id: string): Promise<cliente | null> => { //cuando se haga el login dejar lo de parentesis vacio
  //en cliente borrar eso hasta null y dejar []
  const { data, error } = await supabase
    .from('cliente')
    .select('*')
    .eq('id', id); //borrar esto tambien cuando se haga el login

  if (error) {
    console.error('Error:', error.message);
    return null; //[];
  } else {
    return data[0];
  }
};

export const crearReserva = async (
  fechaRetiro: string,
  estado: string,
  precioTotal: number,
  idEstablecimiento: string,
) => {
  const { error } = await supabase.from('pedido').insert([
    {
      fecha_retiro: fechaRetiro,
      estado,
      precio_total: precioTotal,
      id_establecimiento: idEstablecimiento,
    }
  ]);

  return error;
};

export const getEstablecimientos = async (): Promise<Establecimiento[]> => {
  const { data, error } = await supabase
    .from('establecimiento')
    .select('id_establecimiento, nombre')
    .eq('habilitado', true);  // Opcional: solo traer los habilitados

  if (error) {
    console.error('Error al obtener establecimientos:', error.message);
    return [];
  }
  return data;
};
