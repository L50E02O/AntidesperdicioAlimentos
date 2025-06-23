import './Notificaciones.css';
import { CircleCheckBig } from 'lucide-react';
import { useState } from 'react';

const Notifications = () => {
    const notifications = [
        { id: 1, icon: <CircleCheckBig />, title: "Reserva confirmada", message: "Tu reserva de pan integral está lista para recoger." },
        { id: 2, icon: <CircleCheckBig />, title: "Producto disponible", message: "Nuevas frutas frescas cerca de ti." },
        { id: 3, icon: <CircleCheckBig />, title: "Reserva cancelada", message: "Tu reserva de leche fue cancelada." },
        { id: 4, icon: <CircleCheckBig />, title: "Recordatorio", message: "Recoge tus productos antes de las 18:00." },
    ];

    return (
        <div className="notifications-container">
            <h2>Tus notificaciones</h2>
            <ul className="notifications-list">
                {notifications.map(notification => (
                    <li key={notification.id} className="notification-item">
                        <span className="notification-icon">{notification.icon}</span>
                        <div className="notification-content">
                            <strong>{notification.title}</strong>
                            <p>{notification.message}</p>
                        </div>
                        <span className="notification-arrow">➔</span>
                    </li>
                ))}
            </ul>
            <div className="user-info">
                <span>María López</span>
                <span>Cliente</span>
            </div>
        </div>
    );
};

export default Notifications;
