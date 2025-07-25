import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const API_BASE_URL = `${environment.supabaseUrl}/rest/v1`;

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly SUPABASE_ANON_KEY = environment.supabaseKey;

  constructor(private http: HttpClient) {}

  private getHeaders(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    prefer: string = 'return=minimal'
  ): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${this.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': prefer
    });
  }

  // Ahora acepta query params opcionales
  getAll(table: string, params?: string): Observable<any> {
    const url = `${API_BASE_URL}/${table}${params ? '?' + params : ''}`;
    return this.http.get(url, { headers: this.getHeaders('GET') });
  }

  insert(table: string, data: any): Observable<any> {
    const url = `${API_BASE_URL}/${table}`;
    return this.http.post(url, JSON.stringify(data), { headers: this.getHeaders('POST') });
  }

  update(table: string, idField: string, idValue: string, data: any): Observable<any> {
    const url = `${API_BASE_URL}/${table}?${idField}=eq.${idValue}`;
    const headers = this.getHeaders('PATCH', 'return=representation');

    console.log('🌐 SupabaseService.update URL:', url);
    console.log('🌐 SupabaseService.update Data (antes):', data);
    console.log('🌐 SupabaseService.update Data JSON:', JSON.stringify(data));

    return this.http.patch(url, data, { headers }).pipe(
      tap(response => console.log('🌐 HTTP Response recibida:', response)),
      catchError(error => {
        console.error('🌐 HTTP Error:', error);
        return throwError(error);
      })
    );
  }

  delete(table: string, id: any, idField: string = 'id'): Observable<any> {
    const url = `${API_BASE_URL}/${table}?${idField}=eq.${id}`;
    return this.http.delete(url, { headers: this.getHeaders('DELETE') });
  }

  getById(table: string, idField: string, idValue: string): Observable<any> {
    const url = `${API_BASE_URL}/${table}?${idField}=eq.${idValue}`;
    return this.http.get(url, { headers: this.getHeaders('GET') });
  }
}
