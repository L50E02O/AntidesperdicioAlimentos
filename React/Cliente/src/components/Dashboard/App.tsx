import '../../styles/App.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Productos from '../Productos/Productos';
import Perfil from '../Perfil/perfil';
import Inicio from '../Inicio/Inicio';
import Notificaciones from '../Notificaciones/Notificaciones';
import DetallesProducto from '../DetallesProducto/DetallesProducto';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="sidebar">
        <h2>ReAprovecha</h2>
        <button className="dashboard-button" onClick={() => navigate('/')}>🏠 Inicio</button>
        <button className="dashboard-button" onClick={() => navigate('/productos')}>🛒 Productos</button>
        <button className="dashboard-button" onClick={() => navigate('/notificaciones')}>🔔 Notificaciones</button>
        <button className="dashboard-button" onClick={() => navigate('/perfil')}>👤 Perfil</button>

        <div className="presenta-Perfil">
          <img src="https://via.placeholder.com/40" alt="Foto de perfil" className="foto-mini" />
          <div>
            <p className="nombre-mini">María López</p>
            <p className="rol-mini">Usuario</p>
          </div>
        </div>
      </div>

      <div className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/detalles-producto/:id" element={<DetallesProducto />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
