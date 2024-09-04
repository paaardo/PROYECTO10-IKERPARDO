import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../utils/api';  // Usando axios configurado con interceptor

function DetallesEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState(null);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarAutenticacion = () => {
      const token = localStorage.getItem('token');
      setAutenticado(!!token);
    };

    const obtenerDetallesEvento = async () => {
      try {
        const { data } = await apiClient.get(`/eventos/${id}`);
        setEvento(data);
      } catch (error) {
        setError('Error al obtener los detalles del evento');
      }
    };

    verificarAutenticacion();
    obtenerDetallesEvento();
  }, [id]);

  const confirmarAsistencia = async () => {
    try {
      await apiClient.post(`/eventos/${id}/asistir`);
      alert('Asistencia confirmada');
    } catch (error) {
      alert('No se pudo confirmar asistencia');
    }
  };

  if (error) return <div>{error}</div>;
  if (!evento) return <div>Cargando...</div>;

  // Construir la URL de la imagen correctamente
  const imagenUrl = evento.cartel ? `http://localhost:5000/uploads/${evento.cartel}` : null;

  return (
    <div>
      <h1>{evento.titulo}</h1>
      {imagenUrl && (
        <div>
          <img src={imagenUrl} alt="Cartel del Evento" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      <p>Fecha: {new Date(evento.fecha).toLocaleDateString()}</p>
      <p>Ubicación: {evento.ubicacion}</p>
      <p>{evento.descripcion}</p>
      <h3>Asistentes:</h3>
      <ul>
        {evento.asistentes.map(asistente => (
          <li key={asistente._id}>{asistente.nombre}</li>
        ))}
      </ul>
      {autenticado && (
        <button onClick={confirmarAsistencia}>Confirmar asistencia</button>
      )}
    </div>
  );
}

export default DetallesEvento;
