import './App.css';
import { useState } from 'react';
import Productos from './Productos';


function App() {
  const [vistaActual, setVistaActual] = useState("Inicio");
  return (
    <div className="App">
      <div className="sidebar">
        <h2>ReAprovecha</h2>
        <button className="dashboard-button" onClick={() => setVistaActual("Inicio")}>🏠 Inicio</button>
        <button className="dashboard-button" onClick={() => setVistaActual("Productos")}>🛒 Productos</button>
        <button className="dashboard-button">🔔 Notificaciones</button>
        <button className="dashboard-button">👤 Perfil</button>

        <div className="presenta-Perfil">
          <h3>Perfil y Foto</h3>
        </div>


      </div>

      {vistaActual === "Productos" && <Productos />}
    </div>
  )
}

export default App
