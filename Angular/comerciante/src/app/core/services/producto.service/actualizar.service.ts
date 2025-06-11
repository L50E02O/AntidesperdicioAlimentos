import { Injectable } from '@angular/core';
import { IProduct } from '../../models/IProducto.model';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class actualizarService {
  constructor(private supabase: SupabaseService) {}

  async updateProduct(product: IProduct): Promise<IProduct> {
    const { data, error } = await this.supabase
      .getSupabase()
      .from('producto')
      .update(product)
      .eq('id', product.id_producto)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }

    return data as IProduct;
  }
}