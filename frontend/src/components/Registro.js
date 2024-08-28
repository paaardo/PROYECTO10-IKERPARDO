// src/components/Registro.js
import React, { useState } from 'react';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:5000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contrasena }),
      });
      if (!respuesta.ok) {
        throw new Error('Error al registrarse');
      }
      const datos = await respuesta.json();
      localStorage.setItem('token', datos.token);
      alert('Registro exitoso');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h1>Registrarse</h1>
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
