// src/pages/FacturaPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FacturaForm from '../components/Forms/FacturaForm';

function FacturaPage() {
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/facturas')
            .then(response => setFacturas(response.data))
            .catch(error => console.error('Error al cargar facturas:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Facturas</h2>
            <ul>
                {facturas.map(factura => (
                    <li key={factura.ID_Factura}>
                        Cliente: {factura.Nombre_Cliente} - Monto: ${factura.Precio_unitario}
                    </li>
                ))}
            </ul>
            <FacturaForm />
        </div>
    );
}

export default FacturaPage;
