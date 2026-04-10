import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext.js'; 
import "../styles/navbar.css";
// Cambiamos los iconos por Person y Cart3 (más modernos)
import { List, X, Person, Cart3 } from 'react-bootstrap-icons';
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Conectamos el WiFi del carrito
  const { orders } = useContext(OrderContext);
  const totalItems = orders.reduce((acc, item) => acc + item.quantity, 0);

  // 2. Sacamos al usuario de la "heladera"
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    Swal.fire("¡Adiós, King!", "Sesión cerrada correctamente", "success");
    navigate("/");
    setIsOpen(false);
  };

  return (
    <header className="header-nav">
      <img className="logo" src="src/image/ChatGPT Image 25 sept 2025, 04_07_34 p.m..png" alt="logotipo" />

      <button className="abrir-menu" onClick={toggleMenu}>
        <List size={30} color="white" />
      </button>

      <nav className={`nav ${isOpen ? 'visible' : ''}`}>
        <button className="botoncerrar" onClick={toggleMenu}>
          <X size={30} color="white" />
        </button>

        <ul className="nav-list">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
          <li><Link to="/Products" onClick={() => setIsOpen(false)}>Productos</Link></li>
          <li><Link to="/sobreNosotros" onClick={() => setIsOpen(false)}>Nosotros</Link></li>

          {user?.role === "admin" && (
            <>
              <li><Link to="/admin" onClick={() => setIsOpen(false)}>Admin Productos</Link></li>
              <li><Link to="/admin-users" onClick={() => setIsOpen(false)}>Admin Usuarios</Link></li>
            </>
          )}

          {!user && (
            <li><Link to="/registro" onClick={() => setIsOpen(false)}>Registro</Link></li>
          )}
        </ul>

        <div className="usuarioseccion">
          {/* BOTÓN USUARIO: Cambia de color si estás logueado */}
          <button 
            className="botonusuario" 
            onClick={() => user ? handleLogout() : navigate("/login")}
            title={user ? `Cerrar sesión de ${user.name}` : "Iniciar sesión"}
          >
            <Person size={28} color={user ? "#00ff00" : "white"} />
          </button>

          {/* CARRITO: Con el globito rojo de cantidad */}
          <Link to="/carrito" className="carrito" onClick={() => setIsOpen(false)}>
            <Cart3 size={28} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;