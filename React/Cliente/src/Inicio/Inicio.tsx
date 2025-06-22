import './Inicio.css';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search, MapPin, CircleCheck, Shapes } from 'lucide-react';

const supabaseUrl = 'https://ghnczjiqciwtjwnpqexg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdobmN6amlxY2l3dGp3bnBxZXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MjIyOTQsImV4cCI6MjA2NDQ5ODI5NH0.nV_PXemJ_-NIt6qZZRLLfvSptcE4cObVdAm5zBaQq98';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
//else setProductos(data);

function Inicio() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
        const { data, error } = await supabase
        .from('producto')
        .select('*');

    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Productos recibidos:', data);
        setProductos(data);
    }
};

    fetchProductos();
  }, []);

  return (
    <div className="Inicio-Container">
      <h2 className="Titulo-Inicio">Explora alimentos disponibles</h2>

      <div className="Filtros-Busqueda">
        <div>
            <p>Buscar Producto</p>
            <input placeholder="Ej, Pan, Leche, Huevos... " className="Input" />
            <Search classname="IconoLupa" size={20} />
        </div>

        <div>
            <p>Tipo de alimento</p>
            <input placeholder="Selecciona tipo" className="Input" />
            <Shapes classname = 'IconoTipo' size={20} />
        </div>

        <div>
            <p>Distancia</p>
            <input placeholder="Ej, 5km" className="Input" />
            <MapPin classname='IconoDistancia' size={20} />
        </div>

        <div>
            <p>Estado</p>
            <select className="Input">
                <option>Disponible, reservado...</option>
            </select>
            <CircleCheck className='IconoCirculoCheck' size={20} />
        </div>

      </div>

      <h3 className="Subtitulo">Alimentos para reservar</h3>

      <div className="Tarjetas-Contenedor">
        {productos.map((producto, index) => (
          <div key={index} className="Tarjeta-Producto">
            <div className="Icono-Categoria">🍽️</div>
            <h4 className="Producto-Nombre">{producto.nombre}</h4>
            <p className="Producto-Texto">Precio: ${producto.precio}</p>
            <p className="Producto-Texto">Stock: {producto.stock}</p>
            <p className="Producto-Texto">Descripción: {producto.descripcion}</p>
            <div className="Botones">
              <button className="Boton-Reservar">Reservar</button>
              <button className="Boton-Detalles">Detalles</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;
