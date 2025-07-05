import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class readIncidenciaService {
  constructor(private supabase: SupabaseService) {}

  async readIncidenciaPorComerciante(id_comerciante: string): Promise<any[]> {
    const tableAndQuery = `incidencia?id_comerciante=eq.${id_comerciante}`;
    try {
      const response = await firstValueFrom(this.supabase.getAll(tableAndQuery));
      return response;
    } catch (error) {
      console.error('Error al obtener incidencias:', error);
      return [];
    }
  }
}