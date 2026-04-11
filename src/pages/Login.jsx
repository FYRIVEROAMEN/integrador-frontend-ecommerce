import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/registro.css"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3000/api/auth/login"; 
            const res = await axios.post(url, { email, password });

            // EL ARREGLO MAESTRO:
            // Guardamos solo el objeto 'user' (name, role, etc)
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // Guardamos el token aparte
            localStorage.setItem("token", res.data.token);

            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: `Hola, ${res.data.user.name}`,
                confirmButtonColor: '#0b6bcd'
            }).then(() => {
                // Redirección inteligente
                if (res.data.user.role === 'admin') {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                // Refrescamos la página para que el Navbar se despierte
                window.location.reload();
            });
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || "Email o contraseña incorrectos"
            });
        }
    };

    return (
        <section className="register"> 
            <h1>Iniciar Sesión</h1>
            <form className="register-form" onSubmit={handleLogin}>
                <div className="field">
                    <label>Correo electrónico</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="field">
                    <label>Contraseña</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className="btn btn-primary" type="submit">Entrar</button>
            </form>
        </section>
    );
};

export default Login;