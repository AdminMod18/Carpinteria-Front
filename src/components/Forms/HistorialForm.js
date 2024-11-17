// src/components/Forms/HistorialForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function HistorialForm() {
    const [historial, setHistorial] = useState([]);
    const [usuarioId, setUsuarioId] = useState('');
    const [campoCambiado, setCampoCambiado] = useState('');
    const [valorAntiguo, setValorAntiguo] = useState('');
    const [valorNuevo, setValorNuevo] = useState('');
    const [fechaCambio, setFechaCambio] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const headers = {
        Authorization: `Bearer ${token}`,
        'User-Role': userRole,
    };

    const fetchHistorial = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/historial', { headers });
            setHistorial(response.data);
        } catch (error) {
            console.error('Error al obtener historial:', error);
        }
    };

    useEffect(() => {
        fetchHistorial();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const historialData = {
            Fecha_Cambio: fechaCambio,
            Campo_Cambiado: campoCambiado,
            Valor_Antiguo: valorAntiguo,
            Valor_Nuevo: valorNuevo,
            ID_Usuario: usuarioId,
        };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/historial/${editId}`, historialData, { headers });
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/historial', historialData, { headers });
            }
            setUsuarioId('');
            setCampoCambiado('');
            setValorAntiguo('');
            setValorNuevo('');
            setFechaCambio('');
            fetchHistorial();
        } catch (error) {
            console.error('Error al guardar historial:', error);
            alert(error.response?.data?.error || 'Error al guardar historial');
        }
    };

    const handleEdit = (historialItem) => {
        setUsuarioId(historialItem.ID_Usuario);
        setCampoCambiado(historialItem.Campo_Cambiado);
        setValorAntiguo(historialItem.Valor_Antiguo);
        setValorNuevo(historialItem.Valor_Nuevo);
        setFechaCambio(historialItem.Fecha_Cambio);
        setEditId(historialItem.ID_Historial);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/historial/${id}`, { headers });
            fetchHistorial();
        } catch (error) {
            console.error('Error al eliminar historial:', error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Historial</h1>
            <div className="row">
                <div className="col-lg-4 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Añadir'} Historial</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
                        <div className="mb-3">
                            <label className="form-label">ID Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={usuarioId}
                                onChange={(e) => setUsuarioId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Campo Cambiado</label>
                            <input
                                type="text"
                                className="form-control"
                                value={campoCambiado}
                                onChange={(e) => setCampoCambiado(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor Antiguo</label>
                            <input
                                type="text"
                                className="form-control"
                                value={valorAntiguo}
                                onChange={(e) => setValorAntiguo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor Nuevo</label>
                            <input
                                type="text"
                                className="form-control"
                                value={valorNuevo}
                                onChange={(e) => setValorNuevo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha de Cambio</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fechaCambio}
                                onChange={(e) => setFechaCambio(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Historial</button>
                    </form>
                </div>
                <div className="col-lg-8">
                    <h3 className="text-center">Lista de Cambios en Historial</h3>
                    <table className="table table-bordered table-striped mt-3" style={{ fontSize: '0.9rem' }}>
                        <thead className="table-dark">
                            <tr>
                                <th style={{ width: '15%' }}>ID Usuario</th>
                                <th style={{ width: '20%' }}>Campo Cambiado</th>
                                <th style={{ width: '20%' }}>Valor Antiguo</th>
                                <th style={{ width: '20%' }}>Valor Nuevo</th>
                                <th style={{ width: '15%' }}>Fecha Cambio</th>
                                <th style={{ width: '10%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((historialItem) => (
                                <tr key={historialItem.ID_Historial}>
                                    <td>{historialItem.ID_Usuario}</td>
                                    <td>{historialItem.Campo_Cambiado}</td>
                                    <td>{historialItem.Valor_Antiguo}</td>
                                    <td>{historialItem.Valor_Nuevo}</td>
                                    <td>{historialItem.Fecha_Cambio}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(historialItem)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(historialItem.ID_Historial)}>Eliminar</button>
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

export default HistorialForm;
