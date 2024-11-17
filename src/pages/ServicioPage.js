// src/pages/ServicioPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ServicioPage() {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/servicios')
            .then(response => setServicios(response.data))
            .catch(error => console.error('Error al cargar servicios:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Servicios</h2>
            <ul>
                {servicios.map(servicio => (
                    <li key={servicio.ID_Servicio}>{servicio.Nombre} - ${servicio.Precio}</li>
                ))}
            </ul>
        </div>
    );
}

export default ServicioPage;
