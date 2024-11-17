import React, { useEffect, useState } from 'react';
import CotizacionForm from './Forms/CotizacionForm';
import DescuentoForm from './Forms/DescuentoForm';
import FacturaForm from './Forms/FacturaForm';
import HistorialForm from './Forms/HistorialForm';
import InventarioForm from './Forms/InventarioForm';
import PagoForm from './Forms/PagoForm';
import ProductoForm from './Forms/ProductoForm';
import ResenaForm from './Forms/ResenaForm';
import ReservaForm from './Forms/ReservaForm';
import ServicioForm from './Forms/ServicioForm';
import UsuarioForm from './Forms/UsuarioForm';

import '../styles/ControlPanel.css';

function ControlPanel() {
    const [activeForm, setActiveForm] = useState('inicio');
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedUserRole = localStorage.getItem('userRole');

        if (storedUserName) setUserName(storedUserName);
        if (storedUserRole) setUserRole(parseInt(storedUserRole, 10));
    }, []);

    const renderForm = () => {
        switch (activeForm) {
            case 'usuarios':
                return userRole === 3 ? <UsuarioForm /> : <p>Acceso restringido.</p>;
            case 'servicios':
                return <ServicioForm />;
            case 'cotizaciones':
                return <CotizacionForm />;
            case 'descuentos':
                return userRole === 3 ? <DescuentoForm /> : <p>Acceso restringido.</p>;
            case 'facturas':
                return userRole === 3 ? <FacturaForm /> : <p>Acceso restringido.</p>;
            case 'historial':
                return userRole === 3 ? <HistorialForm /> : <p>Acceso restringido.</p>;
            case 'inventario':
                return userRole === 3 ? <InventarioForm /> : <p>Acceso restringido.</p>;
            case 'pagos':
                return <PagoForm />;
            case 'productos':
                return <ProductoForm />;
            case 'reseñas':
                return <ResenaForm />;
            case 'reservas':
                return <ReservaForm />;
            default:
                return <h2>Bienvenido al Panel de Control</h2>;
        }
    };

    return (
        <div className="control-panel-container">
            <header className="control-panel-header">
                <h1>Menu</h1>
            </header>
            <div className="control-panel-content">
                <nav className="sidebar">
                    <ul>
                        <li><button onClick={() => setActiveForm('inicio')}>Inicio</button></li>
                        <li><button onClick={() => setActiveForm('usuarios')}>Usuarios</button></li>
                        <li><button onClick={() => setActiveForm('servicios')}>Servicios</button></li>
                        <li><button onClick={() => setActiveForm('cotizaciones')}>Cotizaciones</button></li>
                        <li><button onClick={() => setActiveForm('descuentos')}>Descuentos</button></li>
                        <li><button onClick={() => setActiveForm('facturas')}>Facturas</button></li>
                        <li><button onClick={() => setActiveForm('historial')}>Historial</button></li>
                        <li><button onClick={() => setActiveForm('inventario')}>Inventario</button></li>
                        <li><button onClick={() => setActiveForm('pagos')}>Pagos</button></li>
                        <li><button onClick={() => setActiveForm('productos')}>Productos</button></li>
                        <li><button onClick={() => setActiveForm('reseñas')}>Reseñas</button></li>
                        <li><button onClick={() => setActiveForm('reservas')}>Reservas</button></li>
                    </ul>
                </nav>
                <div className="main-content">
                    <div className="control-panel-user-info">
                        <span>Usuario: 👤 {userName || "Invitado"}</span>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}>Salir</button>
                    </div>
                    <div className="content-area">
                        {renderForm()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlPanel;
