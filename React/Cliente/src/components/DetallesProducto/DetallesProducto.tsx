import React from 'react';
import type { Producto } from '../../types/productoT';
import '../../styles/DetallesProducto.css';

interface DetallesProductoProps {
  producto: Producto;
  volver: () => void;
}

const DetallesProducto: React.FC<DetallesProductoProps> = ({ producto, volver }) => {
  return (
    <div>
      <h2>Detalles del producto</h2>
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      <p>Descripción: {producto.descripcion}</p>
      <button>Reservar</button>
      <button onClick={volver}>Volver</button>
    </div>
  );
};

export default DetallesProducto;
