// src/components/Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-white text-center p-4">
            <hr className="bg-light" />
            <p>Síguenos en nuestras redes sociales:</p>
            <a href="#" className="text-white me-4"><i className="fab fa-facebook fa-2x"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-twitter fa-2x"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-instagram fa-2x"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-linkedin fa-2x"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-youtube fa-2x"></i></a>
        </footer>
    );
}

export default Footer;
