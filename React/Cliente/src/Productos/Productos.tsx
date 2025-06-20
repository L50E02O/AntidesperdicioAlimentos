import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Productos.css';
import {Search} from 'lucide-react';

const supabaseUrl = 'https://ghnczjiqciwtjwnpqexg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdobmN6amlxY2l3dGp3bnBxZXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MjIyOTQsImV4cCI6MjA2NDQ5ODI5NH0.nV_PXemJ_-NIt6qZZRLLfvSptcE4cObVdAm5zBaQq98';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            const { data, error} = await supabase
                .from('producto')
                .select('*');
            
            if (error) {
                console.error('Error al obtener productos:', error.message);
            } else {
                setProductos(data);
            }
        };

        fetchProductos();
    }, []);
    return (
        <div className="Productos-Container">
            <h2 className="Titulo-Busqueda">Buscar productos</h2>
            <div className = "BarraBusqueda">
                <Search classname="IconoLupa" size={20} />
                <input className="Input-Busqueda" placeholder="Nombre o palabra clave" />
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
                {productos.map((producto, index) => (
                    <div key={index} className="Tarjeta">
                        <div className="Icono">🍽️</div>
                        <h4>{producto.nombre}</h4>
                        <p>Precio: ${producto.precio}</p>
                        <p>Stock: {producto.stock}</p>
                        <p>Descripcion: {producto.descripcion}</p>
                        <button className="btn-accion">Reservar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Productos;