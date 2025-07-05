export interface Establecimiento {
  id_establecimiento?: string;
  nombre: string;
  direccion: string;
  horario: string;
  id_inventario?: string;
  id_comerciante?: string;
  habilitado: boolean;
}