// src/types/notification.d.ts
export interface Notification {
  id_notificacion: number;
  mensaje: string;
  fecha_envio: string; // O Date
  id_administrador: number;
  // Posiblemente campos para el destinatario: id_cliente?, id_comerciante?
}