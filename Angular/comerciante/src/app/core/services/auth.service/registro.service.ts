import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';
import { Cliente } from '../../models/ICliente.model';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private supabase: SupabaseService) {}

  async registrarCliente(cliente: Cliente): Promise<boolean> {
    try {
      await firstValueFrom(
        this.supabase.insert('cliente', cliente)
      );
      return true;
    } catch (error) {
      console.error('Error registrando cliente:', error);
      return false;
    }
  }
}
