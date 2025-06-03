import './App.css';
import { useState } from 'react';


function App() {
  const [valorInput, setValorInput] = useState("");
  return (
    <div className="App">
      <div className="sidebar">
        <h2>ReAprovecha</h2>
        <button className="dashboard-button">🏠 Inicio</button>
        <button className="dashboard-button">🛒 Productos</button>
        <button className="dashboard-button">🔔 Notificaciones</button>
        <button className="dashboard-button">👤 Perfil</button>
      </div>

      <div className="presenta-Perfil">
          <h3>Perfil y Foto</h3>
      </div>
      
    </div>
  )
}

export default App
