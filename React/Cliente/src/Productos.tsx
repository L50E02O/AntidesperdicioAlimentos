import './Productos.css';
import React from 'react';
const ProductosEjemplo = [
    {
        Nombre: "Ensalada mixta",
        Cantidad: "5 porciones",
        fecha: "2023-10-01",
        Ubicacion: "Cocina",
        Tipo: "Reservar",
        icono: "🥗"
    }
];

function Productos() {
    return (
        <div className="Productos-Container">
            <h2 className="Titulo-Busqueda">Buscar productos</h2>
            <input className="Input-Busqueda" placeholder="Nombre o palabra clave" />
            <div className="Filtros">
                <button>Comida preparada</button>
                <button>Frescos</button>
                <button>Panaderia</button>
                <button>Cercano</button>
                <button>Disponibles</button>
            </div>

            <h3 className="Titulo-Disponibles">Productos Disponibles</h3>
            <div className="Tarjetas-Productos">
                {ProductosEjemplo.map((producto, index) => (
                    <div key={index} className="Tarjeta">
                        <div className="Icono">{producto.icono}</div>
                        <h4>{producto.Nombre}</h4>
                        <p>Cantidad: {producto.Cantidad}</p>
                        <p>Consumir antes: {producto.fecha}</p>
                        <p>Ubicacion: {producto.Ubicacion}</p>
                        <button className="btn-accion">{producto.Tipo}</button>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Productos;