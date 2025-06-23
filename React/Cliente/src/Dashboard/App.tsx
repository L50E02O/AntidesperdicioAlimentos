import './App.css';
import { useState } from 'react';
import Productos from '../Productos/Productos';
import Perfil from '../Perfil/perfil';
import Inicio from '../Inicio/Inicio';
import Notificaciones from '../Notificaciones/Notificaciones';


function App() {
  const [vistaActual, setVistaActual] = useState("Inicio");

  return (

    <div className="App">
      <div className="sidebar">
        <h2>ReAprovecha</h2>
        <button className="dashboard-button" onClick={() => setVistaActual("Inicio")}>🏠 Inicio</button>
        <button className="dashboard-button" onClick={() => setVistaActual("Productos")}>🛒 Productos</button>
        <button className="dashboard-button" onClick={() => setVistaActual("Notificaciones")}>🔔 Notificaciones</button>
        <button className="dashboard-button" onClick={() => setVistaActual("Perfil")}>👤 Perfil</button>

        <div className="presenta-Perfil">
            <img
              src="https://via.placeholder.com/40"
              alt="Foto de perfil"
              className="foto-mini"
            />
          <div>
            <p className="nombre-mini">María López</p>
            <p className="rol-mini">Usuario</p>
          </div>
        </div>



      </div>
      {vistaActual === "Inicio" && (
      <div>
          <h1 className="bienvenida">Bienvenido a ReAprovecha</h1>
        <Inicio />
      </div>
      )}

      {vistaActual === "Productos" && <Productos />}
      {vistaActual === "Perfil" && <Perfil />}
      {vistaActual === "Notificaciones" && <Notificaciones />}
    </div>
  )
}

export default App
