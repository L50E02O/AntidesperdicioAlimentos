export interface Pedido {
  id_pedido?: string;
  id_establecimiento: string; // ID del establecimiento al que pertenece el pedido
  fecha_retiro: Date; // Fecha y hora en que se retira el pedido
  estado: string; // Estado del pedido (ej. "pendiente", "completado", "cancelado")
  precio_total: number; // Precio total del pedido
}