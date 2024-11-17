// src/components/Forms/DescuentoForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function DescuentoForm() {
    const [descuentos, setDescuentos] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [porcentaje, setPorcentaje] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            Role: userRole
        }
    };

    const fetchDescuentos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/descuentos', axiosConfig);
            setDescuentos(response.data);
        } catch (error) {
            console.error('Error al obtener descuentos:', error);
        }
    };

    useEffect(() => {
        fetchDescuentos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const descuentoData = { Descripcion: descripcion, Porcentaje: porcentaje };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/descuentos/${editId}`, descuentoData, axiosConfig);
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/descuentos', descuentoData, axiosConfig);
            }
            setDescripcion('');
            setPorcentaje('');
            fetchDescuentos();
        } catch (error) {
            console.error('Error al guardar descuento:', error);
        }
    };

    const handleEdit = (descuento) => {
        setDescripcion(descuento.Descripcion);
        setPorcentaje(descuento.Porcentaje);
        setEditId(descuento.ID_Descuento);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/descuentos/${id}`, axiosConfig);
            fetchDescuentos();
        } catch (error) {
            console.error('Error al eliminar descuento:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Gestión de Descuentos</h1>
            <div className="row">
                <div className="col-md-6">
                    <h3>{editId ? 'Actualizar' : 'Añadir'} Descuento</h3>
                    <form onSubmit={handleSubmit} className="border p-3 rounded">
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Porcentaje</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Porcentaje"
                                value={porcentaje}
                                onChange={(e) => setPorcentaje(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Descuento</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h3>Lista de Descuentos</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Descripción</th>
                                <th>Porcentaje</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {descuentos.map((descuento) => (
                                <tr key={descuento.ID_Descuento}>
                                    <td>{descuento.Descripcion}</td>
                                    <td>{descuento.Porcentaje}%</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(descuento)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(descuento.ID_Descuento)}>Eliminar</button>
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

export default DescuentoForm;
