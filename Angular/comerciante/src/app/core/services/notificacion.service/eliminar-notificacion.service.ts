import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EliminarNotificacionService {
  constructor(private supabase: SupabaseService) {}

  async eliminarNotificacion(id_notificacion: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.supabase.delete('notificacion_comerciante', id_notificacion, 'id_notificacion')
      );
      return true;
    } catch (error) {
      console.error('Error eliminando notificación:', error);
      return false;
    }
  }
}
