import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private supabase: SupabaseService) {}

  async login(id_comerciante: string, password: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .getSupabase()
      .from('comerciante')
      .select('id_comerciante, password')
      .eq('id_comerciante', id_comerciante || '')
      .eq('password', password || '')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116: No rows found
      console.error('Error al buscar comerciante:', error);
      throw error;
    }

    return !!data;
  }
}