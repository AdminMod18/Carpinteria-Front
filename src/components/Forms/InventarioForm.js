// src/components/Forms/InventarioForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function InventarioForm() {
    const [inventarios, setInventarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const headers = {
        Authorization: `Bearer ${token}`,
        'User-Role': userRole,
    };

    const fetchInventarios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/inventarios', { headers });
            setInventarios(response.data);
        } catch (error) {
            console.error('Error al obtener inventarios:', error);
        }
    };

    useEffect(() => {
        fetchInventarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const inventarioData = { Nombre: nombre, Cantidad: parseInt(cantidad) };

            if (editId) {
                await axios.put(`http://localhost:3000/api/inventarios/${editId}`, inventarioData, { headers });
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/inventarios', inventarioData, { headers });
            }

            setNombre('');
            setCantidad('');
            fetchInventarios();
        } catch (error) {
            console.error('Error al guardar inventario:', error);
            alert(error.response?.data?.error || 'Error al guardar inventario');
        }
    };

    const handleEdit = (inventario) => {
        setNombre(inventario.Nombre);
        setCantidad(inventario.Cantidad);
        setEditId(inventario.ID_Inventario);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/inventarios/${id}`, { headers });
            fetchInventarios();
        } catch (error) {
            console.error('Error al eliminar inventario:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Inventario</h1>
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Agregar'} Producto</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
                        <div className="mb-2">
                            <label className="form-label">Nombre del Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Cantidad</label>
                            <input
                                type="number"
                                className="form-control"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Agregar'} Inventario</button>
                    </form>
                </div>
                <div className="col-lg-7">
                    <h3 className="text-center">Lista de Inventario</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventarios.map((inventario) => (
                                <tr key={inventario.ID_Inventario}>
                                    <td>{inventario.Nombre}</td>
                                    <td>{inventario.Cantidad}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(inventario)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(inventario.ID_Inventario)}>Eliminar</button>
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

export default InventarioForm;
