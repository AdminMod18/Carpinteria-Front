import axios from 'axios';
import React, { useEffect, useState } from 'react';

function HistorialPage() {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/historial', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setHistorial(response.data);
            } catch (error) {
                console.error('Error fetching historial:', error);
            }
        };

        fetchHistorial();
    }, []);

    return (
        <div>
            <h2>Historial de Usuarios</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Acción</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.map((registro) => (
                        <tr key={registro.id}>
                            <td>{registro.id}</td>
                            <td>{registro.usuario}</td>
                            <td>{registro.accion}</td>
                            <td>{registro.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HistorialPage;
