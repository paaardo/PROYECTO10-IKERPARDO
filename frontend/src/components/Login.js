// src/components/Login.js
import React, { useState } from 'react';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena }),
      });
      if (!respuesta.ok) {
        throw new Error('Error al iniciar sesión');
      }
      const datos = await respuesta.json();
      localStorage.setItem('token', datos.token);
      alert('Inicio de sesión exitoso');
    } catch (error) {
      alert(error.message);
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
