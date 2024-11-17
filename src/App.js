import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import ControlPanel from './components/ControlPanel';
import Navbar from './components/Navbar';
import CotizacionPage from './pages/CotizacionPage';
import Cotizar from './pages/Cotizar';
import DescuentoPage from './pages/DescuentoPage';
import FacturaPage from './pages/FacturaPage';
import HistorialPage from './pages/HistorialPage';
import Home from './pages/Home';
import InventarioPage from './pages/InventarioPage';
import Login from './pages/Login';
import PagoPage from './pages/PagoPage';
import ProductoPage from './pages/ProductoPage';
import Proyectos from './pages/Proyectos';
import ResenaPage from './pages/ResenaPage';
import ReservaPage from './pages/ReservaPage';
import Reseñas from './pages/Reseñas';
import ServicioPage from './pages/ServicioPage';
import UsuarioPage from './pages/UsuarioPage';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Retorna true si el token existe
};

// Componente de rutas, para manejar la lógica de Navbar
function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/panel-de-control';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/reseñas" element={<Reseñas />} />
        <Route path="/cotizar" element={<Cotizar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/descuentos" element={<DescuentoPage />} />
        <Route path="/facturas" element={<FacturaPage />} />
        <Route path="/reseñas" element={<Reseñas />} />
        <Route path="/cotizar" element={<Cotizar />} />

        {/* Rutas Protegidas */}
        <Route
          path="/panel-de-control"
          element={isAuthenticated() ? <ControlPanel /> : <Navigate to="/login" />}
        />
        <Route
          path="/usuarios"
          element={isAuthenticated() ? <UsuarioPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/servicios"
          element={isAuthenticated() ? <ServicioPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cotizaciones"
          element={isAuthenticated() ? <CotizacionPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/reservas"
          element={isAuthenticated() ? <ReservaPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/historial"
          element={isAuthenticated() ? <HistorialPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/facturas"
          element={isAuthenticated() ? <FacturaPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/inventarios"
          element={isAuthenticated() ? <InventarioPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/pagos"
          element={isAuthenticated() ? <PagoPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/productos"
          element={isAuthenticated() ? <ProductoPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/resenas"
          element={isAuthenticated() ? <ResenaPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/descuentos"
          element={isAuthenticated() ? <DescuentoPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

// Componente principal de la aplicación
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
