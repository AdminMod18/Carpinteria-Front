// src/components/Forms/ServicioForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function ServicioForm() {
    const [servicios, setServicios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [fechaServicio, setFechaServicio] = useState('');
    const [lugarServicio, setLugarServicio] = useState('');
    const [hora, setHora] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const headers = {
        Authorization: `Bearer ${token}`,
        'User-Role': userRole,
    };

    const fetchServicios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/servicios', { headers });
            setServicios(response.data);
        } catch (error) {
            console.error('Error al obtener servicios:', error);
        }
    };

    useEffect(() => {
        fetchServicios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const servicioData = {
            Nombre: nombre,
            Descripcion: descripcion,
            Precio: parseFloat(precio),
            FechaServicio: fechaServicio,
            LugarServicio: lugarServicio,
            Hora: hora,
            ID_Usuario: usuarioId,
        };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/servicios/${editId}`, servicioData, { headers });
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/servicios', servicioData, { headers });
            }

            setNombre('');
            setDescripcion('');
            setPrecio('');
            setFechaServicio('');
            setLugarServicio('');
            setHora('');
            setUsuarioId('');
            fetchServicios();
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === 'Nombre de servicio ya registrado') {
                alert('Este nombre de servicio ya está registrado. Intenta con otro.');
            } else {
                console.error('Error al guardar servicio:', error);
            }
        }
    };

    const handleEdit = (servicio) => {
        setNombre(servicio.Nombre);
        setDescripcion(servicio.Descripcion);
        setPrecio(servicio.Precio);
        setFechaServicio(servicio.FechaServicio);
        setLugarServicio(servicio.LugarServicio);
        setHora(servicio.Hora);
        setUsuarioId(servicio.ID_Usuario);
        setEditId(servicio.ID_Servicio);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/servicios/${id}`, { headers });
            fetchServicios();
        } catch (error) {
            console.error('Error al eliminar servicio:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Servicios</h1>
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Crear'} Servicio</h3>
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
                            <label className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Precio</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Fecha del Servicio</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fechaServicio}
                                onChange={(e) => setFechaServicio(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Lugar del Servicio</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lugarServicio}
                                onChange={(e) => setLugarServicio(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Hora</label>
                            <input
                                type="time"
                                className="form-control"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">ID Usuario</label>
                            <input
                                type="number"
                                className="form-control"
                                value={usuarioId}
                                onChange={(e) => setUsuarioId(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Servicio</button>
                    </form>
                </div>
                <div className="col-lg-7">
                    <h3 className="text-center">Lista de Servicios</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Fecha</th>
                                <th>Lugar</th>
                                <th>Hora</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicios.map((servicio) => (
                                <tr key={servicio.ID_Servicio}>
                                    <td>{servicio.Nombre}</td>
                                    <td>${servicio.Precio}</td>
                                    <td>{servicio.FechaServicio}</td>
                                    <td>{servicio.LugarServicio}</td>
                                    <td>{servicio.Hora}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(servicio)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(servicio.ID_Servicio)}>Eliminar</button>
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

export default ServicioForm;
