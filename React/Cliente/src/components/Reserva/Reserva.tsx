import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../styles/Reserva.css';
import { crearReserva, getEstablecimientos } from '../../data/base-datos';
import type { Establecimiento } from '../../types/establecimientoT';

const Reserva = () => {
  const { id } = useParams();
  const location = useLocation();
  const nombreProducto = location.state?.nombre || 'Producto';
  const precioUnitario = location.state?.precio || 0;

  const navigate = useNavigate();

  const [fechaRetiro, setFechaRetiro] = useState('');
  const [estado] = useState('pendiente');
  const [cantidad, setCantidad] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);

  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [establecimientoSeleccionado, setEstablecimientoSeleccionado] = useState('');

  useEffect(() => {
    const fetchEstablecimientos = async () => {
      const lista = await getEstablecimientos();
      setEstablecimientos(lista)

      if (lista.length > 0) {
        setEstablecimientoSeleccionado(lista[0].id_establecimiento);
      }
    };

    fetchEstablecimientos();
  }, []);

  useEffect(() => {
    setPrecioTotal(precioUnitario * cantidad);
  }, [cantidad, precioUnitario]);

  const handleReserva = async () => {
  if (!fechaRetiro || !cantidad || !establecimientoSeleccionado) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const error = await crearReserva(fechaRetiro, estado, precioTotal, establecimientoSeleccionado);

    if (error) {
      console.error('Error al crear reserva:', error.message);
      alert('Hubo un problema al hacer la reserva.');
    } else {
      alert('Reserva realizada con éxito!');
      navigate('/');
    }
  };

  return (
    <div className="Reserva-Container">
      <h2>Reservar Producto</h2>
      <p>Reservando el producto: {nombreProducto}</p>
      <p>Precio unitario: ${precioUnitario.toFixed(2)}</p>

      <div className="Reserva-Form">
        <label>Fecha de Retiro:</label>
        <input className = "Fecha-Reserva" type="datetime-local" value={fechaRetiro} onChange={(e) => setFechaRetiro(e.target.value)} />

        <label>Cantidad:</label>
        <input type="number" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />

        <p><strong>Precio Total:</strong> ${precioTotal.toFixed(2)}</p>

        <label>Establecimiento:</label>
        <select value={establecimientoSeleccionado} onChange={(e) => setEstablecimientoSeleccionado(e.target.value)}>
        <option value="">Selecciona un establecimiento</option>
        {establecimientos.map((establecimiento) => (
          <option key={establecimiento.id_establecimiento} value={establecimiento.id_establecimiento}>
            {establecimiento.nombre}
          </option>
        ))}
        </select>

        <button className = "Confirmar-Reserva"onClick={handleReserva}>Confirmar Reserva</button>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};

export default Reserva;
