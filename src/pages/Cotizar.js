import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function Cotizar() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [servicio, setServicio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [presupuesto, setPresupuesto] = useState('');
    
    const handleCotizar = (e) => {
        e.preventDefault();
        alert('Solicitud de cotización enviada. ¡Gracias!');
        setNombre('');
        setEmail('');
        setServicio('');
        setDescripcion('');
        setPresupuesto('');
    };

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h2 style={{ color: '#343a40', fontWeight: 'bold' }}>Cotización de Servicios</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                    Obtén una cotización aproximada para los servicios de carpintería que necesitas. Completa el formulario para más información.
                </p>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-lg-8 col-md-10">
                    <div className="card shadow-lg border-0" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                        <div className="card-body p-5">
                            <h3 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Solicita tu Cotización</h3>
                            <form onSubmit={handleCotizar}>
                                <div className="form-group mb-4">
                                    <label className="form-label" style={{ fontWeight: 'bold' }}>Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingresa tu nombre completo"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" style={{ fontWeight: 'bold' }}>Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ingresa tu correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" style={{ fontWeight: 'bold' }}>Servicio Requerido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="¿Qué tipo de servicio necesitas?"
                                        value={servicio}
                                        onChange={(e) => setServicio(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" style={{ fontWeight: 'bold' }}>Descripción del Proyecto</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Describe brevemente tu proyecto o los detalles específicos"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        style={{ borderRadius: '10px' }}
                                    ></textarea>
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" style={{ fontWeight: 'bold' }}>Presupuesto Aproximado</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="¿Cuál es tu presupuesto aproximado?"
                                        value={presupuesto}
                                        onChange={(e) => setPresupuesto(e.target.value)}
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    style={{
                                        fontSize: '1.2rem',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        backgroundColor: '#343a40',
                                        borderColor: '#343a40',
                                    }}
                                >
                                    Solicitar Cotización
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="alert alert-info text-center mt-5" role="alert">
                        * Este es un ejemplo de contenido de cotización. En el futuro, aquí se mostrará un formulario de cotización interactivo.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cotizar;
