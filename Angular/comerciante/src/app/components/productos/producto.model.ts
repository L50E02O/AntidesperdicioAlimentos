export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  cantidad: number;
  descripcion?: string;
}