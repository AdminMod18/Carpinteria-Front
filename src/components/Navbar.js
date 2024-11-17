import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        if (localStorage.getItem('role') === '3') { // Si es admin, dirige al panel de control
            navigate('/panel-de-control');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Zairi Carpintería</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/proyectos">Proyectos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cotizar">Cotizar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reseñas">Reseñas</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-light ms-3" onClick={handleLogin}>Iniciar Sesión</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
