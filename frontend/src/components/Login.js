import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';  // Importar apiClient en lugar de usar fetch

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post('/usuarios/login', { correo, contrasena });
      localStorage.setItem('token', data.token);
      console.log('Login exitoso, redirigiendo...');
      navigate('/');  // Redirigir a la lista de eventos
    } catch (error) {
      alert(error.response?.data?.mensaje || error.message);
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
