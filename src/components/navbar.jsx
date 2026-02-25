import { useState  } from 'react';

import { Link } from 'react-router-dom';

import './navbar.css';

import { List, X, PersonCircle, BoxSeamFill } from 'react-bootstrap-icons';

const Navbar = () => {

const  [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => setIsOpen(!isOpen);

return (
    <header className="header-nav">
      <img className="logo" src="public/ChatGPT Image 25 sept 2025, 04_07_34 p.m..png" alt="logotipo" />

      {/* Botón Hamburguesa */}
      <button className="abrir-menu" onClick={toggleMenu}>
        <List size={30} color="white" />
      </button>

      {/* Si isOpen es true, le ponemos la clase 'visible' */}
      <nav className={`nav ${isOpen ? 'visible' : ''}`}>
        <button className="botoncerrar" onClick={toggleMenu}>
          <X size={30} color="white" />
        </button>

        <ul className="nav-list">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
          <li><Link to="/Products" onClick={() => setIsOpen(false)}>Productos</Link></li>
          <li><Link to="/sobreNosotros" onClick={() => setIsOpen(false)}>Sobre nosotros</Link></li>
          <li><Link to="/admin" onClick={() => setIsOpen(false)}>Admin productos</Link></li>
          <li><Link to="/registro" onClick={() => setIsOpen(false)}>Registro</Link></li>
        </ul>

        <div className="usuarioseccion">
          <button className="botonusuario"><PersonCircle size={25} /></button>
          <button className="carrito"><BoxSeamFill size={25} /></button>
        </div>
      </nav>
    </header>
);

};

export default Navbar;