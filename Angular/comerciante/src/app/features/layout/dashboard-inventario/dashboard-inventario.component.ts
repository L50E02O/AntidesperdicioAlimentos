import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../core/models/IProducto.model'; // Importa la interfaz

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

  filters = ['Todos', 'Bajo stock'];

  products: IProduct[] = [
    { 
      nombre: 'Manzanas', 
      descripcion: 'Manzanas rojas frescas', 
      precio: 18.00, 
      stock: 12
    },
    { 
      nombre: 'Leche', 
      descripcion: 'Leche entera pasteurizada', 
      precio: 22.00, 
      stock: 8
    },
    { 
      nombre: 'Pan integral', 
      descripcion: 'Pan integral artesanal', 
      precio: 10.00, 
      stock: 5
    }
  ];

  filteredProducts: IProduct[] = [];

  ngOnInit(): void {
    this.applyFilter();
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

  addProduct(): void {
    console.log('Agregar producto clicked');
  }

  editProduct(product: IProduct): void {
    console.log('Edit product:', product);
  }
}
