import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext.jsx'; 
import "../styles/navbar.css";
import { List, X, Cart3, BoxArrowInRight, BoxArrowRight, Person } from 'react-bootstrap-icons';
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { countItems, clearCart } = useContext(OrderContext);
  
  // Obtenemos al usuario del localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Swal.fire({
        title: '¿Cerrar sesión?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("user"); 
            localStorage.removeItem("token"); // También limpiamos el token
            clearCart(); 
            setIsOpen(false);
            navigate("/login"); 
            window.location.reload(); // Refresh para limpiar el estado visual
        }
    });
  };

  return (
    <header className="header-nav">
      <img className="logo" src="/ChatGPT Image 25 sept 2025, 04_07_34 p.m..png" alt="logotipo" />

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

          {/* EL FILTRO MÁGICO: Si es admin, mostramos los paneles */}
          {user?.role === "admin" && (
            <>
              <li><Link to="/admin" onClick={() => setIsOpen(false)} style={{color: '#ffd700'}}>Admin Productos</Link></li>
              <li><Link to="/admin-users" onClick={() => setIsOpen(false)} style={{color: '#ffd700'}}>Admin Usuarios</Link></li>
            </>
          )}
          {!user && <li><Link to="/registro" onClick={() => setIsOpen(false)}>Registro</Link></li>}
        </ul>

        <div className="usuarioseccion">
          {user ? (
            <div className="user-logged-box">
              <span className="user-name">
                <Person size={20} />
                <span className="nav-text">{user.name?.split(' ')[0]}</span>
              </span>
              <button className="btn-session logout" onClick={handleLogout}>
                <BoxArrowRight size={22} />
                <span className="nav-text">Salir</span>
              </button>
            </div>
          ) : (
            <button className="btn-session login" onClick={() => navigate("/login")}>
              <BoxArrowInRight size={22} />
              <span className="nav-text">Ingresar</span>
            </button>
          )}

          <Link to="/carrito" className="carrito-link" onClick={() => setIsOpen(false)}>
            <Cart3 size={24} />
            {countItems > 0 && <span className="cart-badge">{countItems}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;