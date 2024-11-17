// src/components/Header.js
import React from 'react';

function Header() {
    // Obtener el nombre del usuario de localStorage
    const userName = localStorage.getItem('userName');

    return (
        <div className="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
            <div>
                <h5>Usuario: <span className="text-primary">{userName ? userName : "Invitado"}</span></h5>
            </div>
            <button className="btn btn-outline-danger" onClick={() => {
                localStorage.clear();
                window.location.href = '/';
            }}>
                Salir
            </button>
        </div>
    );
}

export default Header;
