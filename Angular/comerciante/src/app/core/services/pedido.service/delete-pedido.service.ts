import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class deletePedidoService {
  constructor(private supabase: SupabaseService) {}

  async deletePedido(pedidoId: string): Promise<any> {
    const tableAndQuery = `pedido`;

    try {
      // Llamamos al método delete de SupabaseService pasándole la URL ya armada
      const response = await firstValueFrom(
        this.supabase.delete(tableAndQuery, pedidoId)
      );

      return response;
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
      throw error;
    }
  }
}
