// src/pages/ResenaPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ResenaPage() {
    const [resenas, setResenas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/resenas')
            .then(response => setResenas(response.data))
            .catch(error => console.error('Error al cargar reseñas:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Reseñas</h2>
            <ul>
                {resenas.map(resena => (
                    <li key={resena.ID_Resena}>Calificación: {resena.Calificacion} - Comentario: {resena.Comentario}</li>
                ))}
            </ul>
        </div>
    );
}

export default ResenaPage;
