import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CrearEvento() {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cartel, setCartel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('fecha', fecha);
    formData.append('ubicacion', ubicacion);
    formData.append('descripcion', descripcion);
    if (cartel) {
      formData.append('cartel', cartel);
    }

    try {
      const respuesta = await fetch('http://localhost:5000/api/eventos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (!respuesta.ok) {
        throw new Error('Error al crear el evento');
      }
      alert('Evento creado exitosamente');
      navigate('/');  // Redirige a la lista de eventos después de crear
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h1>Crear Evento</h1>
      <label>
        Título:
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </label>
      <label>
        Fecha:
        <input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      </label>
      <label>
        Ubicación:
        <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
      </label>
      <label>
        Descripción:
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
      </label>
      <label>
        Cartel:
        <input type="file" onChange={(e) => setCartel(e.target.files[0])} />
      </label>
      <button type="submit">Crear Evento</button>
    </form>
  );
}

export default CrearEvento;
