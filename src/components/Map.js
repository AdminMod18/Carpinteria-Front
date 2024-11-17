// src/components/Map.js
import React from 'react';

function Map() {
    return (
        <div id="contacto" className="container my-5">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18906.129712753736!2d6.722624160288201!3d60.12672284414915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463e997b1b6fc09d%3A0x6ee05405ec78a692!2sJ%C4%99zyk%20trola!5e0!3m2!1spl!2spl!4v1672239918130!5m2!1spl!2spl"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
            ></iframe>
            
            {/* Section with icons */}
            <div className="container text-center mb-5 mt-3">
                <div className="row">
                    <div className="col-md-4">
                        <i className="fas fa-map-marker-alt fa-2x"></i>
                        <p className="mt-2">Ubicación</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fas fa-envelope fa-2x"></i>
                        <p className="mt-2">contacto@zairi.com</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fas fa-phone-alt fa-2x"></i>
                        <p className="mt-2">+123 456 789</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;
