import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class readDetallePedidoService {
  constructor(private supabase: SupabaseService) {}

async readDetallePedidoPorEstablecimiento(id_pedido: string): Promise<any[]> {
  const tableAndQuery = `detalle_pedido?id_pedido=eq.${id_pedido}`;
  try {
    const response = await firstValueFrom(this.supabase.getAll(tableAndQuery));
    return response;
  } catch (error) {
    console.error('Error al obtener detalles de pedido:', error);
    return [];
  }
}
}