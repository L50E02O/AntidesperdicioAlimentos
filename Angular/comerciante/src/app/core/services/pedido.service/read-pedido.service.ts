import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class readPedidoService {
  constructor(private supabase: SupabaseService) {}

async readPedidoPorEstablecimiento(id_establecimiento: string): Promise<any[]> {
  const tableAndQuery = `pedido?id_establecimiento=eq.${id_establecimiento}`;
  try {
    const response = await firstValueFrom(this.supabase.getAll(tableAndQuery));
    return response;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    return [];
  }
}

  async readPedidoPorId(id_pedido: string) {
    const tableAndQuery = `pedido?id_pedido=eq.${id_pedido}`;
    try {
      const response = await firstValueFrom(this.supabase.getAll(tableAndQuery));
      return response.length > 0 ? response[0] : null; // Retorna el primer pedido o null si no existe
    } catch (error) {
      console.error('Error al obtener pedido por ID:', error);
      return null;
    }
  }
}




