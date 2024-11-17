// src/pages/ReservaPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ReservaPage() {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/reservas')
            .then(response => setReservas(response.data))
            .catch(error => console.error('Error al cargar reservas:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Reservas</h2>
            <ul>
                {reservas.map(reserva => (
                    <li key={reserva.ID_Reserva}>{reserva.Fecha_Reserva} - Estado: {reserva.Estado}</li>
                ))}
            </ul>
        </div>
    );
}

export default ReservaPage;
