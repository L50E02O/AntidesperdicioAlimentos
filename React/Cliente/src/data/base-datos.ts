import { createClient } from '@supabase/supabase-js';
import type { Producto } from '../types/productoT';

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