import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../core/models/IProducto.model';
import { ReadProductoPorInventarioService } from '../../../core/services/producto.service/read-producto.service';
import { AuthService } from '../../../core/services/auth.service/auth.service';
import { readEstablecimientoService } from '../../../core/services/establecimiento.service/read-establecimiento.service';

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
    private readEstablecimientoService: readEstablecimientoService

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

      // Obtener ID del establecimiento del usuario autenticado
      const idComerciante = this.authService.getCurrentUserId();
      const usuario = this.authService.getUsuario();
      
      if (!idComerciante || !usuario) {
        this.error = 'No se pudo obtener el ID del comerciante actual.';
        return;
      }

      // Opción 1: Cargar desde inventario
      const id_establecimiento = await this.readEstablecimientoService.readEstablecimientoPorComerciante(usuario.id_comerciante);

      const id_inventario = await this.readEstablecimientoService.readInventarioPorEstablecimiento(id_establecimiento[0].id_establecimiento);
      console.log('ID del inventario:', id_inventario);

      const inventario = await this.readProductoService.readProductoPorInventario(id_inventario[0].id_inventario);
      console.log('Productos del inventario:', inventario);

      

      if (inventario && inventario.length > 0) {
        // Transformar datos del inventario al formato IProduct
        this.products = this.transformInventarioToProducts(inventario);
      } 

      this.applyFilter();
    } catch (error) {
      this.error = 'Error al cargar el inventario';
      console.error('Error al cargar productos:', error);
    } finally {
      this.loading = false;
    }
  }

  // Transformar datos del inventario al formato IProduct
  private transformInventarioToProducts(inventario: any[]): IProduct[] {
    return inventario.map(item => ({
      nombre: item.nombre || item.nombre_producto || 'Sin nombre',
      descripcion: item.descripcion || item.descripcion_producto || 'Sin descripción',
      precio: parseFloat(item.precio || item.precio_venta || '0'),
      stock: parseInt(item.stock || item.cantidad || '0')

    }));
  }

  // Transformar datos de productos al formato IProduct
  private transformProductosToProducts(productos: any[]): IProduct[] {
    return productos.map(item => ({
      id_producto: item.id_producto,
      nombre: item.nombre || 'Sin nombre',
      descripcion: item.descripcion || 'Sin descripción',
      precio: parseFloat(item.precio || '0'),
      stock: parseInt(item.stock || '0'),
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

    // Filtro por búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term)
      );
    }

    // Filtro por stock
    if (this.selectedFilter === 'Bajo stock') {
      tempProducts = tempProducts.filter(p => p.stock < 10);
    }

    this.filteredProducts = tempProducts;
  }

  // Recargar datos
  async reloadData(): Promise<void> {
    await this.loadProducts();
  }

  addProduct(): void {
    console.log('Agregar producto clicked');
    // Aquí podrías abrir un modal o navegar a una página de agregar producto
  }

  editProduct(product: IProduct): void {
    console.log('Edit product:', product);
    // Aquí podrías abrir un modal o navegar a una página de editar producto
  }

  getLowStockCount(): number {
  return this.products.filter(p => p.stock < 10).length;
}

}
