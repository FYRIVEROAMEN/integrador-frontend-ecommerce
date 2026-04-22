import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const hoy = new Date().toISOString().split("T")[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(formData.email)) {
            return Swal.fire({ icon: 'error', title: 'Email inválido', text: 'Poné uno real, King.' });
        }
        if (formData.password !== formData.password2) {
            return Swal.fire({ icon: 'error', title: 'Error', text: 'Las claves no coinciden.' });
        }
        if (!image) {
            return Swal.fire({ icon: 'error', title: 'Falta la foto', text: 'El PDF pide una imagen de perfil.' });
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("birthdate", formData.birthdate);
            data.append("province", formData.province);
            data.append("image", image);

            const url = `${import.meta.env.VITE_API_URL}/api/auth/register`;
            
            await axios.post(url, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada!',
                text: 'Tus datos y tu foto ya están en la base de datos.',
                confirmButtonColor: '#0b6bcd'
            }).then(() => {
                navigate("/login");
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el servidor',
                text: error.response?.data?.message || 'Hubo un problema al crear la cuenta.',
            });
        }
    };

    return (
        <section className="register">
            <h1>Registro</h1>
            <form className="register-form" onSubmit={handleSubmit} noValidate>
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
                            <option value="Catamarca">Catamarca</option>
                            <option value="Chaco">Chaco</option>
                            <option value="Chubut">Chubut</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Corrientes">Corrientes</option>
                            <option value="Entre Ríos">Entre Ríos</option>
                            <option value="Formosa">Formosa</option>
                            <option value="Jujuy">Jujuy</option>
                            <option value="La Pampa">La Pampa</option>
                            <option value="La Rioja">La Rioja</option>
                            <option value="Mendoza">Mendoza</option>
                            <option value="Misiones">Misiones</option>
                            <option value="Neuquén">Neuquén</option>
                            <option value="Río Negro">Río Negro</option>
                            <option value="Salta">Salta</option>
                            <option value="San Juan">San Juan</option>
                            <option value="San Luis">San Luis</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="Santiago del Estero">Santiago del Estero</option>
                            <option value="Tierra del Fuego">Tierra del Fuego</option>
                            <option value="Tucumán">Tucumán</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="image">Foto de perfil *</label>
                    <input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} required />
                </div>
                <button className="btn btn-primary" type="submit">Crear cuenta</button>
            </form>
        </section>
    );
};

export default Registro;