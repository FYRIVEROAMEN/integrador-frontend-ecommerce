import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext.js'; 
import "../styles/navbar.css";
import { List, X, Person, Cart3 } from 'react-bootstrap-icons';
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  
  const { countItems } = useContext(OrderContext);

 
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Swal.fire({
        title: '¿Te vas tan pronto, King?',
        text: "Vas a tener que volver a loguearte para seguir comprando.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No, me quedo'
    }).then((result) => {
        if (result.isConfirmed) {
            
            localStorage.removeItem("user"); 
            setIsOpen(false);
            
            Swal.fire('¡Adiós!', 'Sesión cerrada con éxito.', 'success').then(() => {
                navigate("/login"); 
            });
        }
    });
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
          
          <button 
            className="botonusuario" 
            onClick={() => user ? handleLogout() : navigate("/login")}
            title={user ? `Logueado como: ${user.name}` : "Iniciar Sesión"}
          >
            <Person size={28} color={user ? "#00ff00" : "white"} />
          </button>

         
          <Link to="/carrito" className="carrito" onClick={() => setIsOpen(false)}>
            <Cart3 size={28} />
           
            {countItems > 0 && <span className="cart-badge">{countItems}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;