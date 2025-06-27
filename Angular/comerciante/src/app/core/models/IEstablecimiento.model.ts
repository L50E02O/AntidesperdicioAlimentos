export interface Establecimiento {
  id_establecimiento?: number;
  nombre: string;
  direccion: string;
  horario: string;
  id_inventario?: number;
  id_comerciante?: string;
  habilitado: boolean;
}