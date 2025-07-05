import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class updateProductoService {
  constructor(private supabase: SupabaseService) {}

  async updateProducto(id_producto: string, data: any): Promise<any> {
    const table = 'producto';
    try {
      const response = await firstValueFrom(
        this.supabase.update(table, 'id_producto', id_producto, data)
      );
      return response;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }
}
