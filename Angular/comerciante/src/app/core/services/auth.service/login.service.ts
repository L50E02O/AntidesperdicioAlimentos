import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private supabase: SupabaseService) {}

  async login(usuario: string, password: string): Promise<any> {
    const tablas = [ 'comerciante', 'cliente', 'administrador'];

    for (const tabla of tablas) {
      const tableAndQuery = `${tabla}?usuario=eq.${usuario}&password=eq.${password}&select=*`;
      try {
        const response = await firstValueFrom(
          this.supabase.getAll(tableAndQuery)
        );
        if (response.length > 0) {
          // Devuelve el usuario y el tipo de usuario
          console.log(response[0]);
          return { ...response[0], tipo: tabla };
        }
      } catch (error) {
        // Puedes manejar el error si lo deseas, pero sigue buscando en las otras tablas
      }
    }
    // Si no se encontró en ninguna tabla
    return null;
  }
}