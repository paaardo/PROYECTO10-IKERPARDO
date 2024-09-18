import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const manejarLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <div className="left">
        <button onClick={() => navigate('/')}>Eventos</button>
      </div>
      <div className="right">
        {token ? (
          <>
            <button onClick={() => navigate('/crear-evento')}>Crear Evento</button>
            <button onClick={manejarLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
            <button onClick={() => navigate('/register')}>Registrarse</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
