import { Component } from '@angular/core';
import { ProductosService } from './productos.service';
import { Producto } from './producto.model';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent {
  nuevoProducto: Producto = { id: 0, nombre: '', categoria: '', precio: 0, cantidad: 1 };

  constructor(private productosService: ProductosService) {}

  agregarProducto() {
    this.productosService.agregarProducto(this.nuevoProducto).subscribe(() => {
      alert('Producto agregado correctamente');
    });
  }
}