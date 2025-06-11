import { Injectable } from '@angular/core';
import { IProduct } from '../../models/IProducto.model';
import { SupabaseService } from '../supabase.service';

Injectable({
  providedIn: 'root',
})
export class LeerService {
  constructor(private supabase: SupabaseService) {}

  async getProducts(): Promise<IProduct[]> {
    const { data, error } = await this.supabase
      .getSupabase()
      .from('producto')
      .select('*');

    if (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }

    return data as IProduct[];
  }
}