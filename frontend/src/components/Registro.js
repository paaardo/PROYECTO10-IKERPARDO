import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post('/usuarios/registrar', { nombre, correo, contrasena });
      localStorage.setItem('token', data.token);
      setMensaje({ texto: 'Registro exitoso. Redirigiendo...', tipo: 'informativo' });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMensaje({ texto: error.response?.data?.mensaje || error.message, tipo: 'error' });
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h1>Registro</h1>
      {mensaje.texto && (
        <div className={`mensaje ${mensaje.tipo === 'error' ? 'mensaje-error' : 'mensaje-informativo'}`}>
          {mensaje.texto}
        </div>
      )}
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
