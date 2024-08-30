import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de que la URL sea correcta
      const respuesta = await fetch('http://localhost:5000/api/usuarios/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, contrasena }),
      });
      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.mensaje || 'Error al registrarse');
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
      <h1>Registro</h1>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </label>
      <label>
        Correo:
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
      </label>
      <label>
        Contraseña:
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
      </label>
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Registro;
