import { Injectable } from '@angular/core';
import { IProduct } from '../../models/IProducto.model';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CrearService {
  constructor(private supabase: SupabaseService) {}

  async createProduct(product: IProduct): Promise<IProduct> {
    const { data, error } = await this.supabase
      .getSupabase()
      .from('producto')
      .insert([product])
      .select()
      .single();

    if (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }

    return data as IProduct;
  }
}