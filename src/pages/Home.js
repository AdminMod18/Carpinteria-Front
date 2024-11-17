import React from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Map from '../components/Map';
import Navbar from '../components/Navbar';
import QuienesSomos from '../components/QuienesSomos';
import Trabajos from '../components/Trabajos';

function Home() {
    return (
        <div>
            <Navbar />
            <Banner />
            <QuienesSomos />
            <Trabajos />
            <Map />
            <Footer />
        </div>
    );
}

export default Home;
