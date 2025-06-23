export interface Incidencia {
  id_incidencia: number;
  descripcion: string;
  fecha: string; 
  estado: string; //'pendiente' | 'abierto' | 'resuelto' | 
  id_comerciante: string;
  id_cliente: string;
}