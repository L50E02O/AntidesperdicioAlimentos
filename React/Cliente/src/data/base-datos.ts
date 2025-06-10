import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ghnczjiqciwtjwnpqexg.supabase.co';  // tu URL aquí (ver en API Docs > URL o en Project Overview)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdobmN6amlxY2l3dGp3bnBxZXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MjIyOTQsImV4cCI6MjA2NDQ5ODI5NH0.nV_PXemJ_-NIt6qZZRLLfvSptcE4cObVdAm5zBaQq98';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function pruebaConexion() {
  const { data, error } = await supabase
    .from('producto')
    .select('*')
    .limit(1)

  if (error) {
    console.error('🚨 Error conectando a Supabase:', error.message)
  } else {
    console.log('✅ Conexión exitosa. Datos:', data)
  }
}

pruebaConexion()