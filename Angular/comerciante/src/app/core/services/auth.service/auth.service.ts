import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuario: any = null;

  setUsuario(usuario: any) {
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario() {
    if (this.usuario) return this.usuario;
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUsuario();
  }

  getCurrentUserId(): string | null {
    const usuario = this.getUsuario();
    return usuario ? usuario.id_comerciante : null;
  }

  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }
}