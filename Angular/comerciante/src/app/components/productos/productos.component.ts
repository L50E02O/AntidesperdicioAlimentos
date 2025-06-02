import { Component, OnInit } from '@angular/core';
import { ProductosService } from './productos.service';
import { Producto } from './producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.obtenerProductos().subscribe(data => this.productos = data);
  }
}