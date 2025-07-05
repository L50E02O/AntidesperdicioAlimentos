export interface IProduct {
  id_producto?: string; // Opcional, ya que Supabase lo auto-genera
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  id_inventario?: string; // Asumiendo que puede estar asociado a un inventario
}