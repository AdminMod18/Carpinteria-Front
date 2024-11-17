// src/pages/CotizacionPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CotizacionPage() {
    const [cotizaciones, setCotizaciones] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/cotizaciones')
            .then(response => setCotizaciones(response.data))
            .catch(error => console.error('Error al cargar cotizaciones:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Cotizaciones</h2>
            <ul>
                {cotizaciones.map(cotizacion => (
                    <li key={cotizacion.ID_Cotizacion}>Monto: ${cotizacion.Monto} - Estado: {cotizacion.Estado}</li>
                ))}
            </ul>
        </div>
    );
}

export default CotizacionPage;
