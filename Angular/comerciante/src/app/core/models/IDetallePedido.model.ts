export interface DetallePedido {
    id_detalle_pedido?: number; // Opcional, ya que Supabase lo auto-genera
    id_pedido?: number; // Referencia al pedido al que pertenece este detalle
    id_producto?: number; // Referencia al producto asociado a este detalle
    cantidad: number; // Cantidad del producto en el pedido
    subtotal: number; // Subtotal calculado (cantidad * precio_unitario)
}