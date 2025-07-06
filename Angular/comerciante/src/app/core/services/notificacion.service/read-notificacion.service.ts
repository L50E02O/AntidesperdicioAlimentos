import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { NotificacionComerciante } from '../../models/INotificacionComerciante.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReadNotificacionPorComerciante {
  constructor(private supabase: SupabaseService) {}

  async readNotificacionPorComerciante(id_comerciante: string): Promise<NotificacionComerciante[]> {
    

    try {
      const filter = `id_comerciante=eq.${id_comerciante}`;
      

      // Ahora usando el segundo parámetro de getAll
      const response = await firstValueFrom(
        this.supabase.getAll('notificacion_comerciante', filter)
      );

      if (Array.isArray(response)) {
        return response;
      } else {
        return [];
      }
    } catch (error) {
      
      return [];
    }
  }
}
