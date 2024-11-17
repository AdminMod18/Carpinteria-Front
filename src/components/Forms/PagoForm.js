// src/components/Forms/PagoForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function PagoForm() {
    const [pagos, setPagos] = useState([]);
    const [fechaPago, setFechaPago] = useState('');
    const [monto, setMonto] = useState('');
    const [metodoPago, setMetodoPago] = useState('Efectivo');
    const [estado, setEstado] = useState('Confirmado');
    const [usuarioId, setUsuarioId] = useState('');
    const [facturaId, setFacturaId] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const headers = {
        Authorization: `Bearer ${token}`,
        'User-Role': userRole,
    };

    const fetchPagos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/pagos', { headers });
            setPagos(response.data);
        } catch (error) {
            console.error('Error al obtener pagos:', error);
        }
    };

    useEffect(() => {
        fetchPagos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const pagoData = {
                FechaPago: fechaPago,
                Monto: parseFloat(monto),
                Metodo_pago: metodoPago,
                Estado: estado,
                ID_Usuario: parseInt(usuarioId),
                ID_Factura: parseInt(facturaId),
            };

            if (editId) {
                await axios.put(`http://localhost:3000/api/pagos/${editId}`, pagoData, { headers });
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/pagos', pagoData, { headers });
            }

            setFechaPago('');
            setMonto('');
            setMetodoPago('Efectivo');
            setEstado('Confirmado');
            setUsuarioId('');
            setFacturaId('');
            fetchPagos();
        } catch (error) {
            console.error('Error al guardar pago:', error);
            alert(error.response?.data?.error || 'Error al guardar pago');
        }
    };

    const handleEdit = (pago) => {
        setFechaPago(pago.FechaPago);
        setMonto(pago.Monto);
        setMetodoPago(pago.Metodo_pago);
        setEstado(pago.Estado);
        setUsuarioId(pago.ID_Usuario);
        setFacturaId(pago.ID_Factura);
        setEditId(pago.ID_Pago);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/pagos/${id}`, { headers });
            fetchPagos();
        } catch (error) {
            console.error('Error al eliminar pago:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Pagos</h1>
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Crear'} Pago</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
                        <div className="mb-2">
                            <label className="form-label">Fecha de Pago</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fechaPago}
                                onChange={(e) => setFechaPago(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Monto</label>
                            <input
                                type="number"
                                className="form-control"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Método de Pago</label>
                            <select
                                className="form-select"
                                value={metodoPago}
                                onChange={(e) => setMetodoPago(e.target.value)}
                                required
                            >
                                <option value="Efectivo">Efectivo</option>
                                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Estado</label>
                            <select
                                className="form-select"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                            >
                                <option value="Confirmado">Confirmado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
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
                            <label className="form-label">ID Factura</label>
                            <input
                                type="text"
                                className="form-control"
                                value={facturaId}
                                onChange={(e) => setFacturaId(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Pago</button>
                    </form>
                </div>
                <div className="col-lg-7">
                    <h3 className="text-center">Lista de Pagos</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Usuario</th>
                                <th>Factura</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagos.map((pago) => (
                                <tr key={pago.ID_Pago}>
                                    <td>{pago.ID_Usuario}</td>
                                    <td>{pago.ID_Factura}</td>
                                    <td>${pago.Monto}</td>
                                    <td>{pago.Estado}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(pago)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pago.ID_Pago)}>Eliminar</button>
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

export default PagoForm;
