import { Injectable } from '@angular/core';
import { IProduct } from '../../models/IProducto.model';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class EliminarService {
  constructor(private supabase: SupabaseService) {}

  async deleteProduct(productId: string): Promise<void> {
    const { error } = await this.supabase
      .getSupabase()
      .from('producto')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
}