import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class updatePedidoService {
  constructor(private supabase: SupabaseService) {}

  async updatePedido(pedidoId: string, pedidoData: any): Promise<any> {
    
    try {
      console.log('📡 Llamando a SupabaseService.update...');
      
      const response = await firstValueFrom(
        this.supabase.update('pedido', 'id_pedido', pedidoId, pedidoData)
      );
      
      console.log('✅ Respuesta completa de Supabase:', response);
      console.log('🔍 Tipo de respuesta:', typeof response);
      
      return response;
    } catch (error) {
      console.error('❌ Error en updatePedidoService:', error);
      throw error;
    }
  }
}
