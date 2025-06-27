// src/app/core/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const API_BASE_URL = `${environment.supabaseUrl}/rest/v1`;

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly SUPABASE_ANON_KEY = environment.supabaseKey;

  constructor(private http: HttpClient) { }

  // Método para construir los headers
  private getHeaders(method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET'): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${this.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal'
    });
  }

  // Método para obtener datos de una tabla
  getAll(table: string): Observable<any> {
    const url = `${API_BASE_URL}/${table}`;
    return this.http.get(url, { headers: this.getHeaders('GET') });
  }

  // Método para insertar un nuevo registro
  insert(table: string, data: any): Observable<any> {
    const url = `${API_BASE_URL}/${table}`;
    return this.http.post(url, JSON.stringify(data), { headers: this.getHeaders('POST') });
  }

  // Método para actualizar un registro por id
  update(table: string, id: any, data: any): Observable<any> {
    const url = `${API_BASE_URL}/${table}?id=eq.${id}`;
    return this.http.patch(url, JSON.stringify(data), { headers: this.getHeaders('PATCH') });
  }

  // Método para eliminar un registro por id
  delete(table: string, id: any): Observable<any> {
    const url = `${API_BASE_URL}/${table}?id=eq.${id}`;
    return this.http.delete(url, { headers: this.getHeaders('DELETE') });
  }
}
