// src/components/Forms/ResenaForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function ResenaForm() {
    const [resenas, setResenas] = useState([]);
    const [usuarioId, setUsuarioId] = useState('');
    const [servicioId, setServicioId] = useState('');
    const [comentario, setComentario] = useState('');
    const [calificacion, setCalificacion] = useState(1);
    const [fecha, setFecha] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const headers = {
        Authorization: `Bearer ${token}`,
        'User-Role': userRole,
    };

    const fetchResenas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/resenas', { headers });
            setResenas(response.data);
        } catch (error) {
            console.error('Error al obtener reseñas:', error);
        }
    };

    useEffect(() => {
        fetchResenas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resenaData = {
            Comentario: comentario,
            Calificacion: parseInt(calificacion), // Asegura que es un número
            Fecha: fecha,
            ID_Usuario: usuarioId,
            ID_Servicio: servicioId
        };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/resenas/${editId}`, resenaData, { headers });
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/resenas', resenaData, { headers });
            }

            setUsuarioId('');
            setServicioId('');
            setComentario('');
            setCalificacion(1);
            setFecha('');
            fetchResenas();
        } catch (error) {
            console.error('Error al guardar reseña:', error);
        }
    };

    const handleEdit = (resena) => {
        setUsuarioId(resena.ID_Usuario);
        setServicioId(resena.ID_Servicio);
        setComentario(resena.Comentario);
        setCalificacion(resena.Calificacion);
        setFecha(resena.Fecha);
        setEditId(resena.ID_Resena);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/resenas/${id}`, { headers });
            fetchResenas();
        } catch (error) {
            console.error('Error al eliminar reseña:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Reseñas</h1>
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Crear'} Reseña</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
                        <div className="mb-2">
                            <label className="form-label">ID Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={usuarioId}
                                onChange={(e) => setUsuarioId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">ID Servicio</label>
                            <input
                                type="text"
                                className="form-control"
                                value={servicioId}
                                onChange={(e) => setServicioId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Comentario</label>
                            <textarea
                                className="form-control"
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Calificación</label>
                            <input
                                type="number"
                                className="form-control"
                                value={calificacion}
                                onChange={(e) => setCalificacion(e.target.value)}
                                min="1"
                                max="5"
                                required
                            />
                        </div>
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
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Reseña</button>
                    </form>
                </div>
                <div className="col-lg-7">
                    <h3 className="text-center">Lista de Reseñas</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Usuario</th>
                                <th>Servicio</th>
                                <th>Calificación</th>
                                <th>Fecha</th>
                                <th>Comentario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resenas.map((resena) => (
                                <tr key={resena.ID_Resena}>
                                    <td>{resena.ID_Usuario}</td>
                                    <td>{resena.ID_Servicio}</td>
                                    <td>{resena.Calificacion}</td>
                                    <td>{resena.Fecha}</td>
                                    <td>{resena.Comentario}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(resena)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(resena.ID_Resena)}>Eliminar</button>
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

export default ResenaForm;
