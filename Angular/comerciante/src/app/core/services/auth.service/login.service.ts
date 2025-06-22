import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private supabase: SupabaseService) {}

  async login(usuario: string, password: string): Promise<any> {
    const { data, error } = await this.supabase
      .getSupabase()
      .from('comerciante')
      .select('*')
      .eq('usuario', usuario || '')
      .eq('password', password || '')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error al buscar comerciante:', error);
      throw error;
    }

    return data; // Devuelve el usuario o null
  }
}