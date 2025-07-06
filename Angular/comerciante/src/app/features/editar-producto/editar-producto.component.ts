import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { updateProductoService } from '../../../app/core/services/producto.service/update-producto.service';
import { SupabaseService } from '../../../app/core/services/supabase.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  id_producto!: string;
  nombre = '';
  descripcion = '';
  precio: number | null = null;
  stock: number | null = null;
  loading = false; // ✅ AGREGADO: Estado de carga

  constructor(
    private route: ActivatedRoute,
    private supabase: SupabaseService,
    private updateProducto: updateProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id_producto = this.route.snapshot.paramMap.get('id') || '';
    
    // ✅ AGREGADO: Validar que tenemos un ID válido
    if (!this.id_producto) {
      alert('Error: ID de producto no válido');
      this.router.navigate(['/dashboard/inventario']);
      return;
    }
    
    this.cargarProducto();
  }

  cargarProducto() {
    this.loading = true;
    
    this.supabase.getById('producto', 'id_producto', this.id_producto).subscribe({
      next: (response: any[]) => {
        if (response && response.length > 0) {
          const producto = response[0];
          
          this.nombre = producto.nombre || '';
          this.descripcion = producto.descripcion || '';
          this.precio = producto.precio || 0;
          this.stock = producto.stock || 0;
        } else {
          alert('Producto no encontrado');
          this.router.navigate(['/dashboard/inventario']);
        }
        this.loading = false;
      },
      error: (error) => {
        alert('Error al cargar producto');
        this.loading = false;
      }
    });
  }

  async actualizarProducto() {
    // ✅ AGREGADO: Validaciones
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

    this.loading = true;

    const dataActualizada = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      precio: this.precio,
      stock: this.stock
    };

    try {
      const response = await this.updateProducto.updateProducto(this.id_producto, dataActualizada);
      
      // ✅ AGREGADO: Verificar respuesta
      if (response) {
        alert('Producto actualizado correctamente');
        this.router.navigate(['/dashboard/inventario']); // ✅ CORREGIDO: Ruta correcta
      } else {
        alert('Error: No se recibió confirmación de la actualización');
      }
    } catch (error) {
      alert('Error al actualizar producto. Revisa los datos e intenta nuevamente.');
    } finally {
      this.loading = false;
    }
  }

  // ✅ AGREGADO: Método para cancelar
  cancelar() {
    this.router.navigate(['/dashboard/inventario']);
  }
}
