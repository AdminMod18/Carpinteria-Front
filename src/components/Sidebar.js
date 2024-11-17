// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <nav className="sidebar bg-dark p-3">
            <ul className="list-unstyled">
                <li><Link to="/inicio" target="navframe" className="text-white">Inicio</Link></li>
                <li><Link to="/reseñas" target="navframe" className="text-white">Reseñas</Link></li>
                <li><Link to="/proyectos" target="navframe" className="text-white">Proyectos</Link></li>
                <li><Link to="/cotizar" target="navframe" className="text-white">Cotizar</Link></li>
                <li><Link to="/zoos" target="navframe" className="text-white">Zoos</Link></li>
            </ul>
        </nav>
    );
}

export default Sidebar;
