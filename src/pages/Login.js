import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/login', {
                Correo: email,
                Contrasena: password
            });

            const { token, ID_Rol, Nombre } = response.data;
            if (token && ID_Rol) {
                localStorage.setItem('token', token);
                localStorage.setItem('userRole', ID_Rol);
                localStorage.setItem('userName', Nombre);

                if (ID_Rol === 3 || ID_Rol=== 4) {
                    alert("Inicio de sesión exitoso");
                    navigate('/panel-de-control');
                } else {
                    alert("Solo los administradores pueden acceder al panel de control.");
                    navigate('/acceso-restringido'); // Redirige a una página de acceso restringido
                }
            } else {
                alert("Error: Información de usuario incompleta.");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
