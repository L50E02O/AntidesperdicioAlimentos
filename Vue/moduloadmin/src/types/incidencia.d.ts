export interface Incidencia {
  id_incidencia: number;
  descripcion: string;
  fecha: string; 
  estado: 'pendiente' | 'abierto' | 'resuelto' | string;
  id_comerciante: string;
  id_cliente: string;
}