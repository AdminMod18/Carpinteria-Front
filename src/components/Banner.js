// src/components/Banner.js
import React from 'react';
import bannerImage from '../images/8.jpeg';

function Banner() {
    return (
        <div className="container mt-5 pt-5 text-center">
            <div className="header">
                <h1>Bienvenido a Zairi Fabricamos</h1>
                <p className="lead">Descubre tu carpintería de confianza</p>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <img src={bannerImage} alt="Closet" className="custom-img" style={{ maxWidth: '1200px', height: '350px' }} />
            </div>
        </div>
    );
}

export default Banner;
