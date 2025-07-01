import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class readPedidoService {
  constructor(private supabase: SupabaseService) {}

  async readPedido(pedidoId: string): Promise<any> {
    const tableAndQuery = `pedido`;

    try {
      // Llamamos al método select de SupabaseService pasándole la URL ya armada
      const response = await firstValueFrom(
        this.supabase.getAll(tableAndQuery)
      );

      return response;
    } catch (error) {
      console.error('Error al leer pedido:', error);
      throw error;
    }
  }
}

