import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cargando from './Cargando';
import MensajeError from './MensajeError';
import { hacerFetch } from '../utils/fetchUtils';

function ListaEvento() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const datos = await hacerFetch('http://localhost:5000/api/eventos');
        setEventos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerEventos();
  }, []);

  if (cargando) return <Cargando />;
  if (error) return <MensajeError mensaje={error} />;

  return (
    <div>
      <h1>Lista de Eventos</h1>
      <ul>
        {eventos.map(evento => (
          <li key={evento._id}>
            <Link to={`/eventos/${evento._id}`}>
              {evento.titulo} - {new Date(evento.fecha).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaEvento;
