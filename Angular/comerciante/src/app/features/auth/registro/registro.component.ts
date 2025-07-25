import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../../../core/services/auth.service/registro.service';
import { Cliente } from '../../../core/models/ICliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  cliente: Cliente = {
    nombre: '',
    direccion: '',
    telefono: 0,
    email: '',
    password: '',
    usuario: ''
  };
  error: string = '';
  exito: string = '';
  loading: boolean = false;

  constructor(private registroService: RegistroService, private router: Router) {}

  async onSubmit() {
    this.error = '';
    this.exito = '';
    this.loading = true;
    try {
      const ok = await this.registroService.registrarCliente(this.cliente);
      if (ok) {
        this.exito = '¡Registro exitoso! Ya puedes iniciar sesión.';
        this.cliente = { nombre: '', direccion: '', telefono: 0, email: '', password: '', usuario: '' };
      } else {
        this.error = 'No se pudo registrar. Intenta de nuevo.';
      }
    } catch (e) {
      this.error = 'Error al registrar.';
    } finally {
      this.loading = false;
    }
  }

  cancelarRegistro() {
    this.router.navigate(['/login']);
  }
}
