import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  title: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-dashboard-notificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-notificacion.component.html',
  styleUrls: ['./dashboard-notificacion.component.css']
})
export class DashboardNotificacionComponent implements OnInit {

  notifications: Notification[] = [];

  ngOnInit(): void {
    this.notifications = [
      { title: 'Pedido entregado', message: 'Tu pedido #12345 fue entregado exitosamente.', time: '10:30 AM' },
      { title: 'Producto por vencer', message: 'Leche vence en 2 días.', time: '09:15 AM' },
      { title: 'Nuevo pedido recibido', message: 'Pedido #12346 está pendiente de confirmación.', time: '08:50 AM' },
      { title: 'Incidencia resuelta', message: 'La incidencia #789 fue resuelta.', time: 'Ayer' },
    ];
  }
}
