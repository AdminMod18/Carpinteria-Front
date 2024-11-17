// src/pages/InventarioPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function InventarioPage() {
    const [inventario, setInventario] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/inventarios')
            .then(response => setInventario(response.data))
            .catch(error => console.error('Error al cargar inventario:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Inventario</h2>
            <ul>
                {inventario.map(item => (
                    <li key={item.ID_Inventario}>{item.Nombre} - Cantidad: {item.Cantidad}</li>
                ))}
            </ul>
        </div>
    );
}

export default InventarioPage;
