// src/components/Trabajos.js
import React from 'react';
import estanteriaImg from '../images/2.jpeg';
import cocinaImg from '../images/3.jpeg';
import jacuzziImg from '../images/4.jpeg';
import closetImg from '../images/5.jpeg';
import escritorioImg from '../images/6.jpeg';
import saunaImg from '../images/7.jpeg';

function Trabajos() {
    return (
        <div className="bg-light py-5">
            <div className="container">
                <h2 className="mb-4">Nuestro Trabajo</h2>
                <p>Explora algunos de nuestros modelos más impresionantes, conocidos por su belleza y los esfuerzos de producción.</p>

                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src={closetImg} alt="Closet" className="card-img-top custom-img" />
                            <div className="card-body">
                                <h3 className="card-title">Closet</h3>
                                <p>Un diseño elegante y funcional, adaptado a tus necesidades de almacenamiento.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src={escritorioImg} alt="Escritorio" className="card-img-top custom-img" />
                            <div className="card-body">
                                <h3 className="card-title">Escritorio</h3>
                                <p>Perfecto para tu oficina o espacio de trabajo, combinando estilo y funcionalidad.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src={saunaImg} alt="Sauna" className="card-img-top custom-img" />
                            <div className="card-body">
                                <h3 className="card-title">Sauna</h3>
                                <p>Una experiencia de lujo en tu hogar con nuestros saunas personalizados.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src={estanteriaImg} alt="Estanterías" className="card-img-top custom-img" />
                            <div className="card-body">
                                <h3 className="card-title">Estanterías</h3>
                                <p>Estanterías a medida que se adaptan a tu espacio y estilo de vida.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src={cocinaImg} alt="Cocina Integral" className="card-img-top custom-img" />
                            <div className="card-body">
                                <h3 className="card-title">Cocina Integral</h3>
                                <p>La cocina de tus sueños hecha realidad con materiales de alta calidad.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src={jacuzziImg} alt="Jacuzzi" className="card-img-top custom-img" />
                            <div className="card-body">
                                <h3 className="card-title">Jacuzzi</h3>
                                <p>Un toque de lujo para tu hogar con nuestros jacuzzis personalizados.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trabajos;
