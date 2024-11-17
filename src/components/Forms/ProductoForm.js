// src/components/Forms/ProductoForm.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function ProductoForm() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('Producto');
    const [precio, setPrecio] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/productos', { headers });
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productoData = { Nombre: nombre, Descripcion: descripcion, Estado: estado, Precio: parseFloat(precio) };

        try {
            if (editId) {
                await axios.put(`http://localhost:3000/api/productos/${editId}`, productoData, { headers });
                setEditId(null);
            } else {
                await axios.post('http://localhost:3000/api/productos', productoData, { headers });
            }

            setNombre('');
            setDescripcion('');
            setEstado('Producto');
            setPrecio('');
            fetchProductos();
        } catch (error) {
            console.error('Error al guardar producto:', error);
            alert(error.response?.data?.error || 'Error al guardar producto');
        }
    };

    const handleEdit = (producto) => {
        setNombre(producto.Nombre);
        setDescripcion(producto.Descripcion);
        setEstado(producto.Estado);
        setPrecio(producto.Precio);
        setEditId(producto.ID_Producto);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/productos/${id}`, { headers });
            fetchProductos();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '80vw' }}>
            <h1 className="text-center mb-4">Gestión de Productos</h1>
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <h3 className="text-center">{editId ? 'Actualizar' : 'Crear'} Producto</h3>
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
                            <label className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
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
                                <option value="Producto">Producto</option>
                                <option value="Reservado">Reservado</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Precio</label>
                            <input
                                type="number"
                                className="form-control"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Actualizar' : 'Crear'} Producto</button>
                    </form>
                </div>
                <div className="col-lg-7">
                    <h3 className="text-center">Lista de Productos</h3>
                    <table className="table table-bordered table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.ID_Producto}>
                                    <td>{producto.Nombre}</td>
                                    <td>{producto.Descripcion}</td>
                                    <td>{producto.Estado}</td>
                                    <td>${producto.Precio.toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(producto)}>Editar</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(producto.ID_Producto)}>Eliminar</button>
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

export default ProductoForm;
