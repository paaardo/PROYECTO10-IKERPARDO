// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Lista de Eventos</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
        <li><Link to="/register">Registrarse</Link></li>
        <li><Link to="/upload">Subir Archivo</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
