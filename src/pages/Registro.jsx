import { useState } from "react";
import { useNavigate } from "react-router-dom"; // IMPORTANTE
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/registro.css";

const Registro = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        birthdate: "",
        province: ""
    });

    const navigate = useNavigate(); // USAMOS EL GPS
    const hoy = new Date().toISOString().split("T")[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. VALIDACIONES (No las saques, son el escudo del mono)
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(formData.email)) {
            return Swal.fire({ icon: 'error', title: 'Email inválido', text: 'Poné uno real, King.' });
        }
        if (formData.password !== formData.password2) {
            return Swal.fire({ icon: 'error', title: 'Error', text: 'Las claves no coinciden.' });
        }

        // 2. CONEXIÓN REAL AL BACKEND
        try {
            // Tu ruta de app.js
            const url = "http://localhost:3000/api/auth/register"; 
            
            // 
            await axios.post(url, formData);

            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada de verdad!',
                text: 'Tus datos ya están en MongoDB.',
                confirmButtonColor: '#0b6bcd'
            }).then(() => {
                navigate("/login"); // TELETRANSPORTACIÓN AL LOGIN
            });

        } catch (error) {
            console.error("Error al conectar con el Back:", error);
            Swal.fire({
                icon: 'error',
                title: 'La cocina explotó',
                text: error.response?.data?.message || 'Fijate si prendiste el servidor de Node.',
            });
        }
    };

    return (
        <section className="register">
            <h1>Registro</h1>
            <form className="register-form" onSubmit={handleSubmit} noValidate>
                {/* ... (Tus inputs que están perfectos) ... */}
                <div className="field">
                    <label htmlFor="name">Nombre completo *</label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="field">
                    <label htmlFor="email">Correo electrónico *</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="row">
                    <div className="field">
                        <label htmlFor="password">Contraseña *</label>
                        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="field">
                        <label htmlFor="password2">Repetir contraseña *</label>
                        <input id="password2" name="password2" type="password" value={formData.password2} onChange={handleChange} required />
                    </div>
                </div>
                <div className="row">
                    <div className="field">
                        <label htmlFor="birthdate">Fecha de nacimiento *</label>
                        <input id="birthdate" name="birthdate" type="date" max={hoy} value={formData.birthdate} onChange={handleChange} required />
                    </div>
                    <div className="locacion">
                        <label htmlFor="province">Provincia / País *</label>
                        <select id="province" name="province" value={formData.province} onChange={handleChange} required>
                            <option value="" disabled>Seleccioná una opción…</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="CABA">CABA</option>
                            {/* ... más opciones ... */}
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Crear cuenta</button>
            </form>
        </section>
    );
};

export default Registro;