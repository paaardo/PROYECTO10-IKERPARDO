// src/components/ListaEvento.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cargando from './Cargando';
import MensajeError from './MensajeError';

function ListaEvento() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const respuesta = await fetch('http://localhost:5000/api/eventos');
        if (!respuesta.ok) {
          throw new Error('Error al obtener eventos');
        }
        const datos = await respuesta.json();
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
