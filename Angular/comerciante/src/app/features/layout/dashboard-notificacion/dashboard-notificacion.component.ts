import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificacionComerciante } from '../../../core/models/INotificacionComerciante.model';
import { ReadNotificacionPorComerciante } from '../../../core/services/notificacion.service/read-notificacion.service';
import { AuthService } from '../../../core/services/auth.service/auth.service';
import { EliminarNotificacionService } from '../../../core/services/notificacion.service/eliminar-notificacion.service';

@Component({
  selector: 'app-dashboard-notificacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-notificacion.component.html',
  styleUrls: ['./dashboard-notificacion.component.css']
})
export class DashboardNotificacionComponent implements OnInit {
  notifications: NotificacionComerciante[] = [];
  loading: boolean = true;
  error: string = '';
  showColorPicker: boolean = false;

  constructor(
    private readNotificacionService: ReadNotificacionPorComerciante, 
    private authService: AuthService,
    private eliminarNotificacionService: EliminarNotificacionService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadNotifications();
  }

  async loadNotifications(): Promise<void> {
    try {
      this.loading = true;
      this.error = '';
      
      const idComerciante = this.authService.getCurrentUserId();
      
      if (idComerciante) {
        const notifications = await this.readNotificacionService.readNotificacionPorComerciante(idComerciante);
        this.notifications = notifications || [];
      } else {
        this.error = 'No se pudo obtener el ID del comerciante actual.';
      }
    } catch (error) {
      this.error = 'Error al cargar las notificaciones';
      this.notifications = [];
    } finally {
      this.loading = false;
    }
  }

  getNotificationColor(notification: NotificacionComerciante): string {
    const mensaje = notification.mensaje?.toLowerCase() || '';
    
    if (mensaje.includes('pedido') || mensaje.includes('orden')) {
      return 'pedido';
    } else if (mensaje.includes('stock') || mensaje.includes('inventario')) {
      return 'stock';
    } else if (mensaje.includes('cancelad') || mensaje.includes('error')) {
      return 'error';
    } else if (mensaje.includes('confirmad') || mensaje.includes('éxito')) {
      return 'confirmacion';
    } else {
      return 'info';
    }
  }

  async deleteNotification(notification: NotificacionComerciante): Promise<void> {
    if (!notification.id_notificacion) {
      this.error = 'ID de notificación no válido.';
      return;
    }
    this.loading = true;
    this.error = '';
    try {
      console.log('Eliminando notificación:', notification.id_notificacion);
      const eliminado = await this.eliminarNotificacionService.eliminarNotificacion(notification.id_notificacion);
      if (eliminado) {
        await this.loadNotifications();
      } else {
        this.error = 'No se pudo eliminar la notificación.';
      }
    } catch (error) {
      this.error = 'Error al eliminar la notificación.';
    } finally {
      this.loading = false;
    }
  }
}
