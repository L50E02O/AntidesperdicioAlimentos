import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private supabase: SupabaseService) {}

  async login(usuario: string, password: string): Promise<any> {
    const tableAndQuery = `comerciante?usuario=eq.${usuario}&password=eq.${password}&select=*`;

    try {
          // Llamamos al método getAll de SupabaseService pasándole la URL ya armada
          const response = await firstValueFrom(
            this.supabase.getAll(tableAndQuery)
          );

          // Si no hay coincidencia
          if (response.length === 0) {
            return null;
          }

          // Devuelve el primer comerciante encontrado
          return response[0];
        } catch (error) {
          console.error('Error al buscar comerciante:', error);
          throw error;
        } 
  }
}