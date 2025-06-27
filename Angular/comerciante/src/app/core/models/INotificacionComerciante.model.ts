export interface NotificacionComerciante {
  id_notificacion?: number; // Opcional, ya que Supabase lo auto-genera
  mensaje: string; // Mensaje de la notificación
  fecha_envio: Date; // Fecha y hora de envío de la notificación
  id_comerciante?: number; // ID del comerciante al que se envía la notificación
}