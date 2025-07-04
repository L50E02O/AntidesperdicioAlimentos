import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  category: string;
  quantity: string;
  price: string;
  expiration: string;
}

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

  filters = ['Todos', 'Bajo stock', 'Próximos a vencer'];

  products: Product[] = [
    { name: 'Manzanas', category: 'Frutas', quantity: '12 kg', price: '$18.00/kg', expiration: '3 días' },
    { name: 'Leche', category: 'Lácteos', quantity: '8 lts', price: '$22.00/lt', expiration: '1 día' },
    { name: 'Pan integral', category: 'Panadería', quantity: '5 piezas', price: '$10.00/pz', expiration: '2 días' }
  ];

  filteredProducts: Product[] = [];

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
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    // Aquí puedes implementar lógicas reales si tienes datos suficientes
    if (this.selectedFilter === 'Bajo stock') {
      // Lógica futura
    } else if (this.selectedFilter === 'Próximos a vencer') {
      // Lógica futura
    }

    this.filteredProducts = tempProducts;
  }

  addProduct(): void {
    console.log('Agregar producto clicked');
  }

  editProduct(product: Product): void {
    console.log('Edit product:', product);
  }
}
