import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class readEstablecimientoService {
  constructor(private supabase: SupabaseService) {}

  async readEstablecimiento(establecimientoId: string): Promise<any> {
    const tableAndQuery = `establecimiento?id=eq.${establecimientoId}`;

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

  async readPedidoPorComerciante(id_comerciante: string): Promise<any[]> {
    const tableAndQuery = `pedido?id_comerciante=eq.${id_comerciante}`;
    try {
      const response = await firstValueFrom(this.supabase.getAll(tableAndQuery));
      return response;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      return [];
    }
  }

  async readEstablecimientoPorComerciante(id_comerciante: string): Promise<any[]> {
    const tableAndQuery = `establecimiento?id_comerciante=eq.${id_comerciante}`;
    try {
      const response = await firstValueFrom(this.supabase.getAll(tableAndQuery));
      return response;
    } catch (error) {
      console.error('Error al obtener establecimiento:', error);
      return [];
    }
  }

  async readInventarioPorEstablecimiento(id_establecimiento: string): Promise<any[]> {
    // ✅ CORRECCIÓN: Seleccionar específicamente el campo id_inventario
    const tableAndQuery = `establecimiento?id_establecimiento=eq.${id_establecimiento}&select=id_inventario`;
    
    try {
      const response = await firstValueFrom(this.supabase.getAll(tableAndQuery));
      return response;
    } catch (error) {
      console.error('Error al obtener inventario:', error);
      return [];
    }
  }
}

