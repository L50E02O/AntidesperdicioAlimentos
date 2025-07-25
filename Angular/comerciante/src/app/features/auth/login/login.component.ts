import { Component } from '@angular/core';
import { LoginService } from '../../../core/services/auth.service/login.service';
import { AuthService } from '../../../core/services/auth.service/auth.service'; // Importa el AuthService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  error: string = '';
  constructor(
    private loginService: LoginService,
    private authService: AuthService, // Inyecta el AuthService
    private router: Router
  ) {}

  async onSubmit() {
    try {
      const usuario = await this.loginService.login(this.usuario, this.password);
      if (usuario) {
        this.authService.setUsuario(usuario); // Guarda el usuario y su tipo
        this.error = 'Credenciales correctas';
        // Redirige según el tipo de usuario
        if (usuario.tipo === 'administrador') {
          this.router.navigate(['/admin']);
        } else if (usuario.tipo === 'comerciante') {
          this.router.navigate(['/dashboard']);
        } else if (usuario.tipo === 'cliente') {
          this.router.navigate(['/cliente']);
        }
      } else {
        this.error = 'Credenciales incorrectas';
      }
    } catch (e) {
      this.error = 'Error al iniciar sesión';
    }
  }

  irARegistro() {
    this.router.navigate(['registro']);
  }
}
