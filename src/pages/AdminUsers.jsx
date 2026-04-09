import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminUsers = () => {
    const [usuarios, setUsuarios] = useState([]);

    
    
    useEffect(() => {
        const obtenerUsuarios = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/users");
            setUsuarios(res.data);
        } catch (error) {
            console.error("Error al traer usuarios", error);
        }
    };
    obtenerUsuarios();
    }, []);

    return (
        <main className="admin-page">
            <h1>Administrador de Usuarios</h1>
            <section className="products-table">
                <table className="cb-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((user) => (
                            <tr key={user._id}>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn-mini btn-danger">Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
};

export default AdminUsers;