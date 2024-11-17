// src/pages/ProductoPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ProductoPage() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/productos')
            .then(response => setProductos(response.data))
            .catch(error => console.error('Error al cargar productos:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Productos</h2>
            <ul>
                {productos.map(producto => (
                    <li key={producto.ID_Producto}>{producto.Nombre} - Precio: ${producto.Precio}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductoPage;
