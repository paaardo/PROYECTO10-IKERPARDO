// src/components/CrearEvento.js
import React, { useState } from 'react';

function CrearEvento() {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:5000/api/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ titulo, fecha, ubicacion, descripcion }),
      });
      if (!respuesta.ok) {
        throw new Error('Error al crear el evento');
      }
      alert('Evento creado exitosamente');
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
      <button type="submit">Crear Evento</button>
    </form>
  );
}

export default CrearEvento;
