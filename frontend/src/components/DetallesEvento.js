import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hacerFetch } from '../utils/fetchUtils';
import Cargando from './Cargando';
import MensajeError from './MensajeError';

function DetallesEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const usuarioAutenticado = !!localStorage.getItem('token');  // Verifica si el token está en localStorage

  useEffect(() => {
    const obtenerDetallesEvento = async () => {
      try {
        const datos = await hacerFetch(`http://localhost:5000/api/eventos/${id}`);
        setEvento(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerDetallesEvento();
  }, [id]);

  if (cargando) return <Cargando />;
  if (error) return <MensajeError mensaje={error} />;

  return (
    <div>
      <h1>{evento.titulo}</h1>
      <p>{evento.descripcion}</p>
      <p>Fecha: {new Date(evento.fecha).toLocaleDateString()}</p>
      {usuarioAutenticado && (
        <div>
          <h2>Asistentes</h2>
          <ul>
            {evento.asistentes.map(asistente => (
              <li key={asistente._id}>{asistente.nombre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DetallesEvento;
