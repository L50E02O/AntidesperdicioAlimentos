export interface IProduct {
  id_producto?: number; // Opcional, ya que Supabase lo auto-genera
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  id_inventario?: number; // Asumiendo que puede estar asociado a un inventario
}