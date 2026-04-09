import { useState, useContext } from 'react'; // Agregamos useContext
import { Link, useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext.js'; // Importamos tu contexto
import "../styles/navbar.css";
import { List, X, PersonCircle, BoxSeamFill } from 'react-bootstrap-icons';
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Conectamos el WiFi del carrito para ver cuántos items hay 
  const { orders } = useContext(OrderContext);
  const totalItems = orders.reduce((acc, item) => acc + item.quantity, 0);

  // 2. Sacamos al usuario de la "heladera" (localStorage) [cite: 221]
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => setIsOpen(!isOpen);

  // [cite: 224] Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user"); // Borramos la info
    Swal.fire("¡Adiós, King!", "Sesión cerrada correctamente", "success");
    navigate("/"); // Mandamos al inicio
    setIsOpen(false);
  };

  return (
    <header className="header-nav">
      <img className="logo" src="/ChatGPT Image 25 sept 2025.png" alt="logotipo" />

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

          {/*  SOLO EL ADMIN VE ESTO */}
          {user?.role === "admin" && (
            <>
              <li><Link to="/admin" onClick={() => setIsOpen(false)}>Admin Productos</Link></li>
              <li><Link to="/admin-users" onClick={() => setIsOpen(false)}>Admin Usuarios</Link></li>
            </>
          )}

          {/*  SI NO ESTÁ LOGUEADO, VE REGISTRO */}
          {!user && (
            <li><Link to="/registro" onClick={() => setIsOpen(false)}>Registro</Link></li>
          )}
        </ul>

        <div className="usuarioseccion">
          {/* Botón de Usuario: Si está logueado, ofrece Logout [cite: 224] */}
          <button 
            className="botonusuario" 
            onClick={() => user ? handleLogout() : navigate("/registro")}
            title={user ? `Cerrar sesión de ${user.fullname}` : "Ir a registro"}
          >
            <PersonCircle size={25} color={user ? "#00ff00" : "white"} />
          </button>

          {/* [cite: 183] CARRITO: Solo visible para clientes o si hay items */}
          <Link to="/carrito" className="carrito" onClick={() => setIsOpen(false)}>
            <BoxSeamFill size={25} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;