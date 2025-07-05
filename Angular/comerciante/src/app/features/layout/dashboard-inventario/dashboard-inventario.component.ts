import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../core/models/IProducto.model';
import { ReadProductoPorInventarioService } from '../../../core/services/producto.service/read-producto.service';
import { AuthService } from '../../../core/services/auth.service/auth.service';
import { readEstablecimientoService } from '../../../core/services/establecimiento.service/read-establecimiento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-inventario.component.html',
  styleUrls: ['./dashboard-inventario.component.css']
})
export class DashboardInventarioComponent implements OnInit {
  searchTerm = '';
  selectedFilter: string = 'Todos';
  loading: boolean = true;
  error: string = '';

  filters = ['Todos', 'Bajo stock'];

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  constructor(
    private readProductoService: ReadProductoPorInventarioService,
    private authService: AuthService,
    private readEstablecimientoService: readEstablecimientoService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const usuario = this.authService.getUsuario();

    if (usuario) {
      usuario.id_comerciante || 'Usuario';
      await this.loadProducts();
    }
  }

  async loadProducts(): Promise<void> {
    try {
      this.loading = true;
      this.error = '';

      const idComerciante = this.authService.getCurrentUserId();
      const usuario = this.authService.getUsuario();
      
      if (!idComerciante || !usuario) {
        this.error = 'No se pudo obtener el ID del comerciante actual.';
        return;
      }

      const id_establecimiento = await this.readEstablecimientoService.readEstablecimientoPorComerciante(usuario.id_comerciante);
      const id_inventario = await this.readEstablecimientoService.readInventarioPorEstablecimiento(id_establecimiento[0].id_establecimiento);
      

      const inventario = await this.readProductoService.readProductoPorInventario(id_inventario[0].id_inventario);

      if (inventario && inventario.length > 0) {
        this.products = this.transformInventarioToProducts(inventario);
      } else {
        this.products = [];
      }

      this.applyFilter();
    } catch (error) {
      this.error = 'Error al cargar el inventario';
    } finally {
      this.loading = false;
    }
  }

  // ✅ CORREGIDO: Asegurar que id_producto nunca sea undefined
  private transformInventarioToProducts(inventario: any[]): IProduct[] {
    return inventario.map((item, index) => ({
      id_producto: item.id_producto || item.id || item.producto_id || `temp_${index}`,
      nombre: item.nombre || item.nombre_producto || 'Sin nombre',
      descripcion: item.descripcion || item.descripcion_producto || 'Sin descripción',
      precio: parseFloat(item.precio || item.precio_venta || '0'),
      stock: parseInt(item.stock || item.cantidad || '0')
    }));
  }

  onSearch(): void {
    this.applyFilter();
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    let tempProducts = [...this.products];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term)
      );
    }

    if (this.selectedFilter === 'Bajo stock') {
      tempProducts = tempProducts.filter(p => p.stock < 10);
    }

    this.filteredProducts = tempProducts;
  }

  async reloadData(): Promise<void> {
    await this.loadProducts();
  }

  addProduct(): void {
    this.router.navigate(['/dashboard/agregar-producto']);
  }

  // ✅ CORREGIDO: Validar que el ID existe
  editProduct(id_producto: string | undefined): void {
    if (!id_producto) {
      alert('Error: No se pudo obtener el ID del producto');
      return;
    }
        this.router.navigate(['/dashboard/editar-producto', id_producto]);
  }

  getLowStockCount(): number {
    return this.products.filter(p => p.stock < 10).length;
  }
}
