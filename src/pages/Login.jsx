import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/registro.css"; // Reusamos estilos para ir rápido

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            
            const url = "http://localhost:3000/api/login"; 
            const res = await axios.post(url, { email, password });

            // Guardamos la "pulsera" (datos + token) en el localStorage
            localStorage.setItem("user", JSON.stringify(res.data));

            Swal.fire("¡Bienvenido!", `Hola, ${res.data.fullname}`, "success");
            
            // Redirección inteligente: si es admin, lo mandamos al panel
            if (res.data.role === 'admin') {
                navigate("/admin");
            } else {
                navigate("/");
            }
            
        } catch (error) {
            Swal.fire("Error", "Email o contraseña incorrectos", error);
        }
    };

    return (
        <section className="register"> {/* Reusamos clase para el fondo */}
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