// src/components/Forms/ReservaForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function ReservaForm() {
    const [reservas, setReservas] = useState([]);
    const [usuarioId, setUsuarioId] = useState('');
    const [fechaReserva, setFechaReserva] = useState('');
    const [hora, setHora] = useState('');
    const [estado, setEstado] = useState('Pendiente');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const headers = {
        Authorization: `Bearer ${token}`,
        'User-Role': userRole,
    };

    const fetchReservas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reservas', { headers });
            setReservas(response.data);
        } catch (error) {
            console.error('Error al obtener reservas:', error);
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservaData = {
            Fecha_Reserva: fechaReserva,
            Hora: hora,
            Estado: estado,
            ID_Usuario: usuarioId
        };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/reservas/${editId}`, reservaData, { headers });
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/reservas', reservaData, { headers });
            }

            setUsuarioId('');
            setFechaReserva('');
            setHora('');
            setEstado('Pendiente');
            fetchReservas();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('Error al crear la reserva: Verifica los datos ingresados.');
            } else {
                console.error('Error al guardar reserva:', error);
            }
        }
    };

    const handleEdit = (reserva) => {
        setUsuarioId(reserva.ID_Usuario);
        setFechaReserva(reserva.Fecha_Reserva);
        setHora(reserva.Hora);
        setEstado(reserva.Estado);
        setEditId(reserva.ID_Reserva);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/reservas/${id}`, { headers });
            fetchReservas();
        } catch (error) {
            console.error('Error al eliminar reserva:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Reservas</h1>
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Crear'} Reserva</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
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
                        <div className="mb-2">
                            <label className="form-label">Fecha de Reserva</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fechaReserva}
                                onChange={(e) => setFechaReserva(e.target.value)}
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
                            <label className="form-label">Estado</label>
                            <select
                                className="form-control"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Cancelada">Cancelada</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Reserva</button>
                    </form>
                </div>
                <div className="col-lg-7">
                    <h3 className="text-center">Lista de Reservas</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Usuario</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva) => (
                                <tr key={reserva.ID_Reserva}>
                                    <td>{reserva.ID_Usuario}</td>
                                    <td>{reserva.Fecha_Reserva}</td>
                                    <td>{reserva.Hora}</td>
                                    <td>{reserva.Estado}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(reserva)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(reserva.ID_Reserva)}>Eliminar</button>
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

export default ReservaForm;
