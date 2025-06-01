export interface Incidence {
  id_incidencia: number;
  descripcion: string;
  fecha: string; // O Date
  estado: 'pendiente' | 'en revisión' | 'resuelto' | string; // Define tus estados
  id_comerciante: number;
  id_cliente: number;
  // Podrías añadir datos del comerciante/cliente para mostrar en la tabla
  comerciante_nombre?: string;
  cliente_nombre?: string;
}