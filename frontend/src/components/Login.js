import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';  

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await apiClient.post('/usuarios/login', { correo, contrasena });
      localStorage.setItem('token', data.token);
      console.log('Login exitoso, redirigiendo...');
      navigate('/');
    } catch (error) {
      const mensajeError = error.response?.status === 401
        ? 'Credenciales Incorrectas'
        : 'Error al iniciar sesión';
      setError(mensajeError);
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
      {error && <p className="mensaje-error">{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;
