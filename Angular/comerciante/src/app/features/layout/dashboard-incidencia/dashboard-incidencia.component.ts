import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Incidencia {
  titulo: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-dashboard-incidencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-incidencia.component.html',
  styleUrls: ['./dashboard-incidencia.component.css']
})
export class DashboardIncidenciaComponent implements OnInit {

  incidencias: Incidencia[] = [];

  // Para el formulario
  nuevaIncidencia: Incidencia = { titulo: '', descripcion: '', estado: 'Pendiente' };

  ngOnInit(): void {
    this.incidencias = [
      { titulo: 'Falla en pago', descripcion: 'El pedido #12345 tuvo un error en el cobro.', estado: 'Pendiente' },
      { titulo: 'Incidencia de entrega', descripcion: 'Retraso en entrega de pedido #12346.', estado: 'Resuelta' },
      { titulo: 'Producto dañado', descripcion: 'El pedido #12347 llegó en mal estado.', estado: 'En proceso' },
    ];
  }

  crearIncidencia() {
    if (this.nuevaIncidencia.titulo && this.nuevaIncidencia.descripcion) {
      this.incidencias.unshift({ ...this.nuevaIncidencia });
      this.nuevaIncidencia = { titulo: '', descripcion: '', estado: 'Pendiente' };
    }
  }

  eliminarIncidencia(index: number) {
    this.incidencias.splice(index, 1);
  }
}
