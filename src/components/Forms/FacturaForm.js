// src/components/Forms/FacturaForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function FacturaForm() {
    const [facturas, setFacturas] = useState([]);
    const [razonSocial, setRazonSocial] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [numeroNIT, setNumeroNIT] = useState('');
    const [domicilioCliente, setDomicilioCliente] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [fechaEmision, setFechaEmision] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            'User-Role': userRole,
        }
    };

    const fetchFacturas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/facturas', axiosConfig);
            setFacturas(response.data);
        } catch (error) {
            console.error('Error al obtener facturas:', error);
        }
    };

    useEffect(() => {
        fetchFacturas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const facturaData = {
            Fecha_Emision: fechaEmision,
            RazonSocial: razonSocial,
            Nombre_Cliente: nombreCliente,
            Numero_NIT: numeroNIT,
            Domicilio_Cliente: domicilioCliente,
            Precio_unitario: parseFloat(precioUnitario),
        };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/facturas/${editId}`, facturaData, axiosConfig);
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/facturas', facturaData, axiosConfig);
            }
            setRazonSocial('');
            setNombreCliente('');
            setNumeroNIT('');
            setDomicilioCliente('');
            setPrecioUnitario('');
            setFechaEmision('');
            fetchFacturas();
        } catch (error) {
            console.error('Error al guardar factura:', error);
            alert(error.response?.data?.error || 'Error al guardar factura');
        }
    };

    const handleEdit = (factura) => {
        setFechaEmision(factura.Fecha_Emision);
        setRazonSocial(factura.RazonSocial);
        setNombreCliente(factura.Nombre_Cliente);
        setNumeroNIT(factura.Numero_NIT);
        setDomicilioCliente(factura.Domicilio_Cliente);
        setPrecioUnitario(factura.Precio_unitario);
        setEditId(factura.ID_Factura);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/facturas/${id}`, axiosConfig);
            fetchFacturas();
        } catch (error) {
            console.error('Error al eliminar factura:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Facturas</h1>
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Agregar'} Factura</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
                        <div className="mb-2">
                            <label className="form-label">Fecha de Emisión</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fechaEmision}
                                onChange={(e) => setFechaEmision(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Razón Social</label>
                            <input
                                type="text"
                                className="form-control"
                                value={razonSocial}
                                onChange={(e) => setRazonSocial(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Nombre del Cliente</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Número NIT</label>
                            <input
                                type="text"
                                className="form-control"
                                value={numeroNIT}
                                onChange={(e) => setNumeroNIT(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Domicilio del Cliente</label>
                            <input
                                type="text"
                                className="form-control"
                                value={domicilioCliente}
                                onChange={(e) => setDomicilioCliente(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Precio Unitario</label>
                            <input
                                type="number"
                                className="form-control"
                                value={precioUnitario}
                                onChange={(e) => setPrecioUnitario(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Factura</button>
                    </form>
                </div>
                <div className="col-lg-7">
                    <h3 className="text-center">Lista de Facturas</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Fecha Emisión</th>
                                <th>Razón Social</th>
                                <th>Cliente</th>
                                <th>NIT</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facturas.map((factura) => (
                                <tr key={factura.ID_Factura}>
                                    <td>{factura.Fecha_Emision}</td>
                                    <td>{factura.RazonSocial}</td>
                                    <td>{factura.Nombre_Cliente}</td>
                                    <td>{factura.Numero_NIT}</td>
                                    <td>${factura.Precio_unitario}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(factura)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(factura.ID_Factura)}>Eliminar</button>
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

export default FacturaForm;
