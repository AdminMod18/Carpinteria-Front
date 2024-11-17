// src/pages/DescuentoPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DescuentoForm from '../components/Forms/DescuentoForm';

function DescuentoPage() {
    const [descuentos, setDescuentos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/descuentos')
            .then(response => setDescuentos(response.data))
            .catch(error => console.error('Error al cargar descuentos:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Descuentos</h2>
            <ul>
                {descuentos.map(descuento => (
                    <li key={descuento.ID_Descuento}>
                        {descuento.Descripcion} - {descuento.Porcentaje}%
                    </li>
                ))}
            </ul>
            <DescuentoForm />
        </div>
    );
}

export default DescuentoPage;
