import '../../styles/Inicio.css';
import type { Producto } from '../../types/productoT';
import { useEffect, useState } from 'react';
import { getProducts } from '../../data/base-datos';
import { Search, MapPin, CircleCheck, Shapes } from 'lucide-react';
import { BuscarNombre, BuscarPrecio} from '../../utils/FiltrarProductos';
import DetallesProducto from '../DetallesProducto/detallesProducto';

const Inicio = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const [nombreFiltro, setNombreFiltro] = useState('');
  const [precioFiltro, setPrecioFiltro] = useState('');

  // Cargar productos iniciales
  useEffect(() => {
    const fetchProductos = async () => {
      const todosProductos = await getProducts();
      setProductos(todosProductos);
      setProductosFiltrados(todosProductos);
    };
    fetchProductos();
  }, []);

  // Filtrar productos cada vez que cambian los filtros
  useEffect(() => {
    let resultado = productos;
    resultado = BuscarNombre(resultado, nombreFiltro);
    setProductosFiltrados(resultado);
  }, [productos, nombreFiltro, precioFiltro]);

  const handleDetallesClick = (producto: Producto) => {
      setProductoSeleccionado(producto);
    };

    if (productoSeleccionado) {
      return <DetallesProducto producto={productoSeleccionado} />;
    }

  return (
    <div className="Inicio-Container">
      <h2 className="Titulo-Inicio">Explora alimentos disponibles</h2>

      {/* Filtros */}
      <div className="Filtros-Busqueda">
        
        {/* Buscar por nombre */}
        <div>
          <p>Buscar Producto</p>
          <input
            placeholder="Ej, Pan, Leche, Huevos..."
            className="Input"
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.target.value)}
          />
          <Search className="IconoLupa" size={20} />
        </div>

        {/* Filtrar por tipo */}
        <div>
          <p>Precio</p>
          <input
            placeholder="$10, $20, etc..."
            className="Input"
            value={precioFiltro}
            onChange={(e) => setPrecioFiltro(e.target.value)}
          />
          <Shapes className='IconoTipo' size={20} />
        </div>

        {/* Otros filtros con estado o distancia, si quieres */}
        {/* ... */}

      </div>

      <h3 className="Subtitulo">Alimentos para reservar</h3>

      {/* Mostrar productos filtrados */}
      <div className="Tarjetas-Contenedor">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto, index) => (
            <div key={index} className="Tarjeta-Producto">
              <div className="Icono-Categoria">🍽️</div>
              <h4 className="Producto-Nombre">{producto.nombre}</h4>
              <p className="Producto-Texto">Precio: ${producto.precio}</p>
              <p className="Producto-Texto">Stock: {producto.stock}</p>
              <p className="Producto-Texto">Descripción: {producto.descripcion}</p>
              <div className="Botones">
                <button className="Boton-Reservar">Reservar</button>
                <button className="Boton-Detalles" onClick={() => handleDetallesClick(producto)} >Detalles</button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default Inicio;