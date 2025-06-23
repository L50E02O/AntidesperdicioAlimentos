import './perfil.css';
import { User, Mail, Phone, Bell, Globe } from 'lucide-react';

function Perfil() {
  return (
    <div className="perfil-container">
      <h2 className="perfil-titulo">Perfil</h2>

      <div className="perfil-header-card">
        <div className="perfil-avatar">
          <User size={32} />
        </div>
        <div className="perfil-info-text">
          <h3>María López</h3>
          <p>Usuario desde enero 2024</p>
        </div>
        <div className="perfil-buttons">
          <button className="btn-editar">Editar perfil</button>
          <button className="btn-cerrar">Cerrar sesión</button>
        </div>
      </div>

      <div className="perfil-section">
        <h4>Información personal</h4>
        <div className="input-group">
          <User className="input-icon" />
          <input type="text" value="María López" readOnly />
        </div>
        <div className="input-group">
          <Mail className="input-icon" />
          <input type="email" value="maria.lopez@email.com" readOnly />
        </div>
        <div className="input-group">
          <Phone className="input-icon" />
          <input type="text" value="+34 600 123 456" readOnly />
        </div>
      </div>

      <div className="perfil-section">
        <h4>Preferencias</h4>
        <div className="preferencia-item">
          <Bell className="preferencia-icon" />
          <div>
            <strong>Notificaciones</strong>
            <p>Recibir alertas de reservas</p>
          </div>
          <input type="checkbox" />
        </div>
        <div className="preferencia-item">
          <Globe className="preferencia-icon" />
          <div>
            <strong>Idioma</strong>
            <p>Español</p>
          </div>
          <select>
            <option>Español</option>
            <option>Inglés</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
