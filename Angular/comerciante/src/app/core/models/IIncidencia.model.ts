export interface Incidencia {
    id_incidencia?: string; // Opcional, ya que Supabase lo auto-genera
    descripcion: string;
    fecha: Date;
    estado: 'pendiente' | 'en_proceso' | 'resuelta' | 'cancelada'; // Estados posibles de la incidencia
    id_comerciante?: string; // Asumiendo que puede estar asociado a un comerciante
    id_cliente?:    string; // Asumiendo que puede estar asociado a un cliente
}