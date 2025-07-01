import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class updatePedidoService {
  constructor(private supabase: SupabaseService) {}

  async updatePedido(pedidoId: string, pedidoData: any): Promise<any> {
    const tableAndQuery = `pedido`;

    try {
      // Llamamos al método update de SupabaseService pasándole la URL ya armada
      const response = await firstValueFrom(
        this.supabase.update(tableAndQuery, pedidoId, pedidoData)
      );

      return response;
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      throw error;
    }
  }
}
