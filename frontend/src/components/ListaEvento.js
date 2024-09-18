import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cargando from './Cargando';
import apiClient from '../utils/api'; 

function ListaEvento() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ordenado, setOrdenado] = useState(false);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const url = ordenado
          ? '/eventos/ordenados'
          : '/eventos';
        const { data } = await apiClient.get(url);
        setEventos(data);
      } catch (error) {
        const mensajeError = error.response?.data?.mensaje || 'Error al obtener eventos';
        setError(mensajeError);
      } finally {
        setCargando(false);
      }
    };

    obtenerEventos();
  }, [ordenado]);

  const cambiarOrden = () => {
    setCargando(true);
    setOrdenado(!ordenado);
  };

  if (cargando) return <Cargando />;
  if (error) return <div className="mensaje-error">Error: {error}</div>;

  return (
    <div className="contenedor-eventos">
      <h1>Lista de Eventos</h1>
      <button onClick={cambiarOrden}>
        {ordenado ? 'Ordenar por defecto' : 'Ordenar por fecha'}
      </button>
      <div className="tarjetas-eventos">
        {eventos.map(evento => (
          <div key={evento._id} className="tarjeta-evento">
            <img 
              src={`http://localhost:5000/uploads/${evento.cartel}`} 
              alt={`Cartel de ${evento.titulo}`} 
              className="imagen-evento"
            />
            <div className="contenido-evento">
              <h3>{evento.titulo}</h3>
              <p>{new Date(evento.fecha).toLocaleDateString()}</p>
              <p>{evento.descripcion}</p>
              <Link to={`/eventos/${evento._id}`} className="enlace-detalles">Ver detalles</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaEvento;
