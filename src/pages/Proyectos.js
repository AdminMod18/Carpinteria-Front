import React from 'react';
import proyecto1 from '../images/1.jpeg';
import proyecto2 from '../images/2.jpeg';
import proyecto3 from '../images/3.jpeg';
import proyecto4 from '../images/4.jpeg';
import proyecto5 from '../images/5.jpeg';
import proyecto6 from '../images/6.jpeg';
import proyecto7 from '../images/7.jpeg';
import proyecto8 from '../images/8.jpeg';

function Proyectos() {
    return (
        <div className="container mt-5">
            <h2 className="text-center">Nuestros Proyectos</h2>
            <p>Conoce algunos de los proyectos de carpintería en los que hemos trabajado.</p>
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                        <img src={proyecto1} className="card-img-top" alt="Proyecto de Cocina Modular" />
                        <div className="card-body">
                            <h5 className="card-title">Proyecto de Cocina Modular</h5>
                            <p className="card-text">Diseño y construcción de una cocina modular personalizada.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                        <img src={proyecto2} className="card-img-top" alt="Muebles para Sala" />
                        <div className="card-body">
                            <h5 className="card-title">Muebles para Sala</h5>
                            <p className="card-text">Fabricación de muebles personalizados para una sala de estar moderna.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                        <img src={proyecto3} className="card-img-top" alt="Armario Empotrado" />
                        <div className="card-body">
                            <h5 className="card-title">Armario Empotrado</h5>
                            <p className="card-text">Construcción de un armario empotrado en una habitación principal.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                        <img src={proyecto4} className="card-img-top" alt="Proyecto de Oficina" />
                        <div className="card-body">
                            <h5 className="card-title">Proyecto de Oficina</h5>
                            <p className="card-text">Mobiliario personalizado para una oficina profesional.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                        <img src={proyecto5} className="card-img-top" alt="Estantería para Hogar" />
                        <div className="card-body">
                            <h5 className="card-title">Estantería para Hogar</h5>
                            <p className="card-text">Diseño y construcción de una estantería moderna para el hogar.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                        <img src={proyecto6} className="card-img-top" alt="Puerta Principal de Madera" />
                        <div className="card-body">
                            <h5 className="card-title">Puerta Principal de Madera</h5>
                            <p className="card-text">Construcción de una puerta principal de madera de alta calidad.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                        <img src={proyecto7} className="card-img-top" alt="Closet a Medida" />
                        <div className="card-body">
                            <h5 className="card-title">Closet a Medida</h5>
                            <p className="card-text">Diseño y construcción de un closet a medida.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                        <img src={proyecto8} className="card-img-top" alt="Mesa de Centro" />
                        <div className="card-body">
                            <h5 className="card-title">Mesa de Centro</h5>
                            <p className="card-text">Fabricación de una mesa de centro de estilo contemporáneo.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="alert alert-info mt-3" role="alert">
                * Este es un contenido de muestra para la sección de proyectos.
            </div>
        </div>
    );
}

export default Proyectos;
