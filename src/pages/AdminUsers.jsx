import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/adminProducts.css"; 

const AdminUsers = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        role: "client" 
    });

    const urlApi = "http://localhost:3000/api/users";
    const baseUrl = "http://localhost:3000";

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token"); 
        return { headers: { authorization: token } };
    };

    const obtenerUsuarios = async () => {
        try {
            const res = await axios.get(urlApi, getAuthHeaders());
            setUsuarios(res.data);
        } catch (error) {
            console.error("Error al traer usuarios:", error);
        }
    };

    const prepararEdicion = (user) => {
        setEditando(true);
        setIdEditar(user._id);
        setFormData({
            name: user.name || user.firstname || "Sin nombre", 
            email: user.email,
            role: user.role
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${urlApi}/${idEditar}`, formData, getAuthHeaders());
            Swal.fire({ 
                icon: "success", 
                title: "¡Usuario actualizado!", 
                background: '#1a1a1a', 
                color: '#fff',
                timer: 2000 
            });
            cancelarEdicion();
            obtenerUsuarios(); 
        } catch (error) {
            Swal.fire({ 
                icon: "error", 
                title: "No se pudo editar", 
                background: '#1a1a1a', 
                color: '#fff'
            
            },error);
        }
    };

    const eliminarUsuario = async (id) => {
        const result = await Swal.fire({ 
            title: '¿Borrar usuario?', 
            icon: 'warning', 
            showCancelButton: true, 
            confirmButtonColor: '#d33',
            background: '#1a1a1a', 
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${urlApi}/${id}`, getAuthHeaders());
                obtenerUsuarios();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const cancelarEdicion = () => {
        setEditando(false);
        setIdEditar(null);
        setFormData({ name: "", email: "", role: "client" });
    };

    useEffect(() => { 
        obtenerUsuarios(); 
    }, []);

    return (
        <main className="admin-page">
            <h1 style={{textAlign: 'center', color: '#fff', margin: '20px 0'}}>Administrador de Usuarios 👤🚀</h1>
            
            {editando && (
                <section className="form-container" style={{marginBottom: '30px', border: '1px solid #0b6bcd'}}>
                    <h2 style={{color: '#0b6bcd'}}>Editar Usuario</h2>
                    <form className="admin-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Nombre Completo</label>
                            <input 
                                type="text" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="field">
                            <label>Rol del Sistema</label>
                            <select 
                                value={formData.role} 
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                            >
                                <option value="client">Client</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button type="submit" className="btn btn-primary" style={{flex: 1}}>Guardar</button>
                            <button type="button" className="btn btn-outline" onClick={cancelarEdicion} style={{flex: 1, color: '#fff', border: '1px solid #fff'}}>Cancelar</button>
                        </div>
                    </form>
                </section>
            )}

            <section className="products-table">
                <div className="table-wrap">
                    <table className="cb-table">
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u) => (
                                <tr key={u._id}>
                                    <td>
                                        <img 
                                            src={u.image ? `${baseUrl}${u.image}` : `${baseUrl}/uploads/users/default.png`} 
                                            alt={u.name} 
                                            style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#444'}}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `${baseUrl}/uploads/users/default.png`;
                                            }}
                                        />
                                    </td>
                                    <td>{u.name || u.firstname || "Sin nombre"}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span style={{padding: '4px 10px', borderRadius: '10px', background: u.role === 'admin' ? '#0b6bcd' : '#444', fontSize: '12px', textTransform: 'uppercase'}}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="td-actions">
                                        <button className="btn-mini btn-edit" onClick={() => prepararEdicion(u)}>Editar</button>
                                        <button className="btn-mini btn-danger" onClick={() => eliminarUsuario(u._id)}>Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default AdminUsers;