// src/components/Forms/CotizacionForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function CotizacionForm() {
    const [cotizaciones, setCotizaciones] = useState([]);
    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState('');
    const [estado, setEstado] = useState('Pendiente');
    const [usuarioId, setUsuarioId] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            Role: userRole
        }
    };

    const fetchCotizaciones = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/cotizaciones', axiosConfig);
            setCotizaciones(response.data);
        } catch (error) {
            console.error('Error al obtener cotizaciones:', error);
        }
    };

    useEffect(() => {
        fetchCotizaciones();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cotizacionData = { Fecha: fecha, Monto: parseFloat(monto), Estado: estado, ID_Usuario: parseInt(usuarioId) };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/cotizaciones/${editId}`, cotizacionData, axiosConfig);
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/cotizaciones', cotizacionData, axiosConfig);
            }
            setFecha('');
            setMonto('');
            setEstado('Pendiente');
            setUsuarioId('');
            fetchCotizaciones();
        } catch (error) {
            console.error('Error al guardar cotización:', error);
        }
    };

    const handleEdit = (cotizacion) => {
        setFecha(cotizacion.Fecha);
        setMonto(cotizacion.Monto);
        setEstado(cotizacion.Estado);
        setUsuarioId(cotizacion.ID_Usuario);
        setEditId(cotizacion.ID_Cotizacion);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/cotizaciones/${id}`, axiosConfig);
            fetchCotizaciones();
        } catch (error) {
            console.error('Error al eliminar cotización:', error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '90vw' }}>
            <h1 className="text-center">Gestión de Cotizaciones</h1>
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <h3>{editId ? 'Actualizar' : 'Añadir'} Cotización</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded">
                        <div className="mb-2">
                            <label className="form-label">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Monto</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Monto"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Estado</label>
                            <select
                                className="form-select"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Aprobada">Aprobada</option>
                                <option value="Rechazada">Rechazada</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">ID Usuario</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="ID Usuario"
                                value={usuarioId}
                                onChange={(e) => setUsuarioId(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Cotización</button>
                    </form>
                </div>
                <div className="col-md-7">
                    <h3 className="text-center">Lista de Cotizaciones</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>ID Usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cotizaciones.map((cotizacion) => (
                                <tr key={cotizacion.ID_Cotizacion}>
                                    <td>{cotizacion.Fecha}</td>
                                    <td>${cotizacion.Monto}</td>
                                    <td>{cotizacion.Estado}</td>
                                    <td>{cotizacion.ID_Usuario}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(cotizacion)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cotizacion.ID_Cotizacion)}>Eliminar</button>
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

export default CotizacionForm;
