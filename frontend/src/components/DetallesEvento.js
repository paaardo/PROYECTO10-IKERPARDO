// src/components/DetallesEvento.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cargando from './Cargando';
import MensajeError from './MensajeError';

function DetallesEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEvento = async () => {
      try {
        const respuesta = await fetch(`http://localhost:5000/api/eventos/${id}`);
        if (!respuesta.ok) {
          throw new Error('Error al obtener el evento');
        }
        const datos = await respuesta.json();
        setEvento(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerEvento();
  }, [id]);

  const manejarAsistencia = async () => {
    try {
      const respuesta = await fetch(`http://localhost:5000/api/eventos/${id}/asistir`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!respuesta.ok) {
        throw new Error('Error al confirmar asistencia');
      }
      alert('Asistencia confirmada');
      // Actualizar el estado del evento si es necesario
    } catch (error) {
      alert(error.message);
    }
  };

  if (cargando) return <Cargando />;
  if (error) return <MensajeError mensaje={error} />;

  return (
    <div>
      <h1>{evento.titulo}</h1>
      <p>{new Date(evento.fecha).toLocaleDateString()}</p>
      <p>{evento.ubicacion}</p>
      <p>{evento.descripcion}</p>
      <button onClick={manejarAsistencia}>Confirmar Asistencia</button>
    </div>
  );
}

export default DetallesEvento;
