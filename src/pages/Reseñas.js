import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import product1 from '../images/1.jpeg'; // Imagen de ejemplo del producto 1
import product2 from '../images/2.jpeg'; // Imagen de ejemplo del producto 2
import starEmpty from '../images/star-empty.jpg'; // Imagen de estrella vacía
import starFull from '../images/star-full.png'; // Imagen de estrella llena

function Reseñas() {
    // Función para renderizar estrellas basadas en la calificación
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i <= rating ? starFull : starEmpty}
                    alt="star"
                    style={{ width: '20px', height: '20px' }}
                />
            );
        }
        return stars;
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Reseñas de Clientes</h2>
            <p className="text-center" style={{ color: '#6c757d' }}>Lee lo que nuestros clientes dicen sobre nuestros servicios.</p>
            <div className="row">
                {/* Reseña 1 */}
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <img src={product1} className="card-img-top" alt="Producto 1" style={{ height: '200px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title text-center" style={{ color: '#343a40' }}>Excelente trabajo</h5>
                            <p className="card-text" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                                "La carpintería fue de alta calidad y entregaron a tiempo. Muy recomendado."
                            </p>
                            <div className="text-center mb-2">
                                {renderStars(5)}
                            </div>
                            <p className="text-muted text-center" style={{ fontSize: '0.85rem' }}>- Juan Pérez</p>
                        </div>
                    </div>
                </div>

                {/* Reseña 2 */}
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <img src={product2} className="card-img-top" alt="Producto 2" style={{ height: '200px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title text-center" style={{ color: '#343a40' }}>Profesionales y amigables</h5>
                            <p className="card-text" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                                "El equipo fue muy profesional y el resultado final fue espectacular."
                            </p>
                            <div className="text-center mb-2">
                                {renderStars(4)}
                            </div>
                            <p className="text-muted text-center" style={{ fontSize: '0.85rem' }}>- Ana Gómez</p>
                        </div>
                    </div>
                </div>
                
                {/* Reseña 3 (Ejemplo adicional) */}
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <img src={product1} className="card-img-top" alt="Producto 3" style={{ height: '200px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title text-center" style={{ color: '#343a40' }}>Trabajo de calidad</h5>
                            <p className="card-text" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                                "El trabajo es impecable y los materiales son de primera calidad."
                            </p>
                            <div className="text-center mb-2">
                                {renderStars(5)}
                            </div>
                            <p className="text-muted text-center" style={{ fontSize: '0.85rem' }}>- Luis García</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="alert alert-info mt-3 text-center" role="alert">
                * Este es un contenido de muestra para la sección de reseñas.
            </div>
        </div>
    );
}

export default Reseñas;
