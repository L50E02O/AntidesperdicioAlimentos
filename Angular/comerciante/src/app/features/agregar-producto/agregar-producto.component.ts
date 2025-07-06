import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createProductoService } from '../../../app/core/services/producto.service/create-producto.service';
import { AuthService } from '../../../app/core/services/auth.service/auth.service';
import { readEstablecimientoService } from '../../../app/core/services/establecimiento.service/read-establecimiento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  nombre = '';
  descripcion = '';
  precio: number | null = null;
  stock: number | null = null;
  categoria = '';
  
  id_establecimiento = '';
  id_inventario = '';
  loading = false;

  constructor(
    private createProducto: createProductoService,
    private authService: AuthService,
    private readEstablecimientoService: readEstablecimientoService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadEstablecimientoData();
  }

  async loadEstablecimientoData(): Promise<void> {
    try {
      const usuario = this.authService.getUsuario();
      
      if (!usuario) {
        alert('Error: Usuario no autenticado');
        this.router.navigate(['/login']);
        return;
      }

      const establecimientos = await this.readEstablecimientoService.readEstablecimientoPorComerciante(usuario.id_comerciante);
      
      if (establecimientos && establecimientos.length > 0) {
        this.id_establecimiento = establecimientos[0].id_establecimiento;
        
        const inventarios = await this.readEstablecimientoService.readInventarioPorEstablecimiento(this.id_establecimiento);
        
        if (inventarios && inventarios.length > 0) {
          this.id_inventario = inventarios[0].id_inventario;
        } else {
          alert('Error: No se encontró inventario para este establecimiento');
        }
      } else {
        alert('Error: No se encontró establecimiento para este comerciante');
      }
    } catch (error) {
      alert('Error al cargar datos necesarios');
    }
  }

  async agregarProducto(): Promise<void> {
    if (!this.nombre.trim()) {
      alert('El nombre del producto es obligatorio');
      return;
    }

    if (this.precio === null || this.precio <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }

    if (this.stock === null || this.stock < 0) {
      alert('El stock no puede ser negativo');
      return;
    }

    if (!this.id_inventario) {
      alert('Error: No se pudo obtener el ID del inventario');
      return;
    }

    this.loading = true;

    const nuevoProducto = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim() || 'Sin descripción',
      precio: this.precio,
      stock: this.stock,
      id_inventario: this.id_inventario
    };

    try {
      const response = await this.createProducto.createProducto(nuevoProducto);
      
      if (response && response.length > 0) {
        alert('Producto agregado correctamente');
        this.router.navigate(['/dashboard/inventario']);
      } else {
        alert('Error: No se recibió confirmación del servidor');
      }
    } catch (error) {
      alert('Error al agregar producto. Revisa la consola para más detalles.');
    } finally {
      this.loading = false;
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/inventario']);
  }
}
