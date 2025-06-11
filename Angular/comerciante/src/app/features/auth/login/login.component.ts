import { Component } from '@angular/core';
import { LoginService } from '../../../core/services/auth.service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  id_comerciante: string = '';
  password: string = '';
  error: string = '';

  constructor(private loginService: LoginService) {}

  async onSubmit() {
    try {
      const loginExitoso = await this.loginService.login(this.id_comerciante);
      if (loginExitoso) {
        this.error = 'Credenciales correctas';
        // Aquí podrías redirigir al usuario a otra página o realizar alguna acción adicional
      } else {
        this.error = 'Credenciales incorrectas';
      }
    } catch (e) {
      this.error = 'Error al iniciar sesión';
    }
  }
}
