import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class createProductoService {
  constructor(private supabase: SupabaseService) {}

  async createProducto(data: any): Promise<any> {
    const table = 'producto';
    
    
    try {
      const response = await firstValueFrom(this.supabase.insert(table, data));
      return response;
    } catch (error) {
      console.error('Error detallado al crear producto:', error);
      
      if (error && typeof error === 'object') {
        console.error('Detalles del error:', JSON.stringify(error, null, 2));
      }
      
      throw error; // Re-lanzar el error para que el componente lo maneje
    }
  }
}