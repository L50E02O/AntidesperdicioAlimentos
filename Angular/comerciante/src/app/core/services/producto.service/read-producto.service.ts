import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReadProductoPorInventarioService {
  constructor(private supabase: SupabaseService) {}

async readProductoPorInventario(id_inventario: string): Promise<any[]> {
  const tableAndQuery = `producto?id_inventario=eq.${id_inventario}`;
  try {
    const response = await firstValueFrom(this.supabase.getAll(tableAndQuery));
    return response;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}
}