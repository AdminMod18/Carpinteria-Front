// src/pages/UsuarioPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UsuarioPage() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Cargar datos de usuarios desde el backend
        axios.get('http://localhost:3000/api/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(error => console.error('Error al cargar usuarios:', error));
    }, []);

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.ID_Usuario}>{usuario.Nombre} - {usuario.Correo}</li>
                ))}
            </ul>
        </div>
    );
}

export default UsuarioPage;
