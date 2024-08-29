import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),  // Aquí asegúrate de usar el mismo nombre de la clave que en el backend
      });
      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.mensaje || 'Error al iniciar sesión');
      }
      const datos = await respuesta.json();
      localStorage.setItem('token', datos.token);
      navigate('/eventos');
    } catch (error) {
      alert(error.message); // Esto muestra el error en un popup
    }
  };
  
  


  return (
    <form onSubmit={manejarSubmit}>
      <h1>Iniciar Sesión</h1>
      <label>
        Correo:
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
      </label>
      <label>
        Contraseña:
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
      </label>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;
