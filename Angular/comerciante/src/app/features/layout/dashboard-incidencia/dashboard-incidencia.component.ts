import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Incidencia } from '../../../core/models/IIncidencia.model';
import { readIncidenciaService } from '../../../core/services/incidencia.service/read-incidencia.service';
import { AuthService } from '../../../core/services/auth.service/auth.service';

@Component({
  selector: 'app-dashboard-incidencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-incidencia.component.html',
  styleUrls: ['./dashboard-incidencia.component.css']
})
export class DashboardIncidenciaComponent implements OnInit {
  incidencias: Incidencia[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private readIncidenciaService: readIncidenciaService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadIncidencias();
  }

  async loadIncidencias(): Promise<void> {
    try {
      this.loading = true;
      this.error = '';
      
      const idComerciante = this.authService.getCurrentUserId();
      
      if (idComerciante) {
        const incidencias = await this.readIncidenciaService.readIncidenciaPorComerciante(idComerciante);
        this.incidencias = incidencias || [];
      } else {
        this.error = 'No se pudo obtener el ID del comerciante actual.';
      }
    } catch (error) {
      this.error = 'Error al cargar las incidencias';
      this.incidencias = [];
    } finally {
      this.loading = false;
    }
  }

  getEstadoColor(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'pendiente':
        return 'estado-pendiente';
      case 'en_proceso':
      case 'en proceso':
        return 'estado-proceso';
      case 'resuelta':
      case 'resuelto':
        return 'estado-resuelta';
      default:
        return 'estado-default';
    }
  }

  eliminarIncidencia(incidencia: Incidencia): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta incidencia?')) {
      // Eliminar de la lista local
      this.incidencias = this.incidencias.filter(inc => inc.id_incidencia !== incidencia.id_incidencia);
      
      // Aquí podrías agregar la llamada al servicio de eliminación
      // await this.deleteIncidenciaService.deleteIncidencia(incidencia.id_incidencia);
    }
  }
}
