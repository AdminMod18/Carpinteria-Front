// src/pages/PagoPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function PagoPage() {
    const [pagos, setPagos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/pagos')
            .then(response => setPagos(response.data))
            .catch(error => console.error('Error al cargar pagos:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Pagos</h2>
            <ul>
                {pagos.map(pago => (
                    <li key={pago.ID_Pago}>Monto: ${pago.Monto} - Estado: {pago.Estado}</li>
                ))}
            </ul>
        </div>
    );
}

export default PagoPage;
