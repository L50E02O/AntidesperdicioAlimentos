import { useEffect, useState } from 'react';
import type { Producto } from '../../types/productoT';
import '../../styles/Productos.css';
import {Search} from 'lucide-react';
import { getProducts } from '../../data/base-datos';
import { BuscarNombre } from '../../utils/FiltrarProductos';
import DetallesProducto from '../DetallesProducto/detallesProducto';

const Productos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

    const [nombreFiltro, setNombreFiltro] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            const productos = await getProducts();
                setProductos(productos);
                setProductosFiltrados(productos)
        };

        fetchProductos();
    }, []);


    useEffect(() => {
        let resultado = productos;
        resultado = BuscarNombre(resultado, nombreFiltro);
        setProductosFiltrados(resultado);
    }, [productos, nombreFiltro]
    )

    const handleDetallesClick = (producto: Producto) => {
      setProductoSeleccionado(producto);
    };

    if (productoSeleccionado) {
      return <DetallesProducto producto={productoSeleccionado} />;
    }
    
    return (
        <div className="Productos-Container">
            <h2 className="Titulo-Busqueda">Buscar productos</h2>
            <div className = "BarraBusqueda">
                <input 
                className="Input-Busqueda" 
                placeholder="Nombre o palabra clave"
                value={nombreFiltro}
                onChange={(e) => setNombreFiltro(e.target.value)}
                />
                <Search classname="IconoLupa" size={20} />
            </div>
            <div className="Filtros">
                <button>Comida preparada</button>
                <button>Frescos</button>
                <button>Panaderia</button>
                <button>Cercano</button>
                <button>Disponibles</button>
            </div>

            <h3 className="Titulo-Disponibles">Productos Disponibles</h3>
            <div className="Tarjetas-Productos">
                {productosFiltrados.map((producto, index) => (
                    <div key={index} className="Tarjeta">
                        <div className="Icono">🍽️</div>
                        <h4>{producto.nombre}</h4>
                        <p>Precio: ${producto.precio}</p>
                        <p>Stock: {producto.stock}</p>
                        <p>Descripcion: {producto.descripcion}</p>
                        <button className="btn-accion">Reservar</button>
                        <button className="Boton-Detalles" onClick={() => handleDetallesClick(producto)} >Detalles</button>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Productos;