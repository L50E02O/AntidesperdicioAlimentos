// filtrarProductos.ts

import type { Producto } from '../types/productoT';

export const BuscarNombre = (productos: Producto[], nombre: string): Producto[] => {
  if (!nombre) return productos; // si no hay filtro, devuelve todos
  return productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
};

// Puedes agregar otros filtros en este mismo archivo
export const BuscarPrecio = (productos: Producto[], tipo: string): Producto[] => {
  if (!tipo || tipo === 'Selecciona tipo') return productos;
    return productos.filter(p => p.precio);
  };