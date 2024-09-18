import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../utils/api'; 

function DetallesEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [asistenciaConfirmada, setAsistenciaConfirmada] = useState(false);

  useEffect(() => {
    const verificarAutenticacion = () => {
      const token = localStorage.getItem('token');
      setAutenticado(!!token);
    };

    const obtenerDetallesEvento = async () => {
      try {
        const { data } = await apiClient.get(`/eventos/${id}`);
        setEvento(data);
        const token = localStorage.getItem('token');
        if (token) {
          const usuarioId = JSON.parse(atob(token.split('.')[1])).id;
          setAsistenciaConfirmada(data.asistentes.some(asistente => asistente._id === usuarioId));
        }
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
      setAsistenciaConfirmada(true);
      const { data } = await apiClient.get(`/eventos/${id}`);
      setEvento(data);
    } catch (error) {
      console.log('No se pudo confirmar asistencia:', error);
    }
  };
  

  if (error) return <div>{error}</div>;
  if (!evento) return <div>Cargando...</div>;

  const imagenUrl = evento.cartel ? `http://localhost:5000/uploads/${evento.cartel}` : null;

  return (
    <div className="detalles-evento">
      <h1>{evento.titulo}</h1>
      {imagenUrl && (
        <div>
          <img src={imagenUrl} alt="Cartel del Evento" />
        </div>
      )}
      <p>Fecha: {new Date(evento.fecha).toLocaleDateString()}</p>
      <p>Ubicación: {evento.ubicacion}</p>
      <p>{evento.descripcion}</p>
      <h3>Asistentes:</h3>
      <ul className="asistentes">
        {evento.asistentes.length > 0 ? (
          evento.asistentes.map(asistente => (
            <li key={asistente._id}>{asistente.nombre}</li>
          ))
        ) : (
          <p>No hay asistentes confirmados aún.</p>
        )}
      </ul>
      {autenticado && (
        <button 
          className="confirmar-asistencia" 
          onClick={confirmarAsistencia}
          disabled={asistenciaConfirmada}
        >
          {asistenciaConfirmada ? 'Asistencia Confirmada' : 'Confirmar asistencia'}
        </button>
      )}
    </div>
  );
}

export default DetallesEvento;
