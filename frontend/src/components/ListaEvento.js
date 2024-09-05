import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cargando from './Cargando';
import MensajeError from './MensajeError';
import { hacerFetch } from '../utils/fetchUtils';

function ListaEvento() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ordenado, setOrdenado] = useState(false);  // Estado para controlar el orden

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const url = ordenado
          ? 'http://localhost:5000/api/eventos/ordenados'
          : 'http://localhost:5000/api/eventos';

        const datos = await hacerFetch(url);
        setEventos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerEventos();
  }, [ordenado]);  // Actualizar cuando cambie el estado de "ordenado"

  const cambiarOrden = () => {
    setCargando(true);  // Muestra el loading durante el cambio de orden
    setOrdenado(!ordenado);  // Alterna entre ordenado y no ordenado
  };

  if (cargando) return <Cargando />;
  if (error) return <MensajeError mensaje={error} />;

  return (
    <div>
        <h1>Lista de Eventos</h1>
        <button onClick={cambiarOrden}>
          {ordenado ? 'Ordenar por defecto' : 'Ordenar por fecha'}
        </button>
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
