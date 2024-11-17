// src/components/Forms/UsuarioForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function UsuarioForm() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState(4);
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/usuarios', { headers });
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usuarioData = { Nombre: nombre, Correo: correo, Contrasena: contrasena, ID_Rol: rol };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/usuarios/${editId}`, usuarioData, { headers });
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/usuarios/registro', usuarioData, { headers });
            }

            setNombre('');
            setCorreo('');
            setContrasena('');
            setRol(4);
            fetchUsuarios();
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === 'Correo ya registrado') {
                alert('Este correo ya está registrado. Intenta con otro.');
            } else {
                console.error('Error al guardar usuario:', error);
            }
        }
    };

    const handleEdit = (usuario) => {
        setNombre(usuario.Nombre);
        setCorreo(usuario.Correo);
        setEditId(usuario.ID_Usuario);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/usuarios/${id}`, { headers });
            fetchUsuarios();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Usuarios</h1>
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Crear'} Usuario</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
                        <div className="mb-2">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Correo</label>
                            <input
                                type="email"
                                className="form-control"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>
                        {!editId && (
                            <div className="mb-2">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="mb-2">
                            <label className="form-label">Rol</label>
                            <select
                                className="form-control"
                                value={rol}
                                onChange={(e) => setRol(Number(e.target.value))}
                                required
                            >
                                <option value={3}>Admin</option>
                                <option value={4}>Usuario</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Usuario</button>
                    </form>
                </div>
                <div className="col-lg-7">
                    <h3 className="text-center">Lista de Usuarios</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.ID_Usuario}>
                                    <td>{usuario.Nombre}</td>
                                    <td>{usuario.Correo}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(usuario)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(usuario.ID_Usuario)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsuarioForm;
