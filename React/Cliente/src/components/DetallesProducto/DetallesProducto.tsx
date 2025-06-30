import React from 'react';
import type { Producto } from '../../types/productoT';
import '../../styles/DetallesProducto.css';
import { useNavigate, useParams } from 'react-router-dom';

interface DetallesProductoProps {
  producto: Producto;
}

const DetallesProducto: React.FC<DetallesProductoProps> = ({ producto }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Detalles del producto</h2>
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      <p>Descripción: {producto.descripcion}</p>
      <button>Reservar</button>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default DetallesProducto;
