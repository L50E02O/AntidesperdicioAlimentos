import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class createPedidoService {
  constructor(private supabase: SupabaseService) {}

  async createPedido(pedidoData: any): Promise<any> {
    const tableAndQuery = `pedido`;

    try {
      // Llamamos al método insert de SupabaseService pasándole la URL ya armada
      const response = await firstValueFrom(
        this.supabase.insert(tableAndQuery, pedidoData)
      );

      return response;
    } catch (error) {
      console.error('Error al crear pedido:', error);
      throw error;
    }
  }
}

