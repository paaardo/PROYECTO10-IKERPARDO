import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cargando from './Cargando';

function CrearEvento() {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cartel, setCartel] = useState(null);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const fechaMinima = new Date().toISOString().slice(0, 16);

  const validarExtension = (file) => {
    const extensionesPermitidas = /jpeg|jpg|png/i;
    const extension = file.name.split('.').pop().toLowerCase();
    return extensionesPermitidas.test(extension);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje({ texto: 'No tienes autorización para crear eventos', tipo: 'error' });
      return;
    }

    if (cartel && !validarExtension(cartel)) {
      setMensaje({ texto: 'Solo se permiten archivos JPG, JPEG o PNG', tipo: 'error' });
      return;
    }

    setCargando(true); 

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
      const datos = await respuesta.json();
      
      if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'Error al crear el evento');
      }

      setMensaje({ texto: 'Evento creado exitosamente. Redirigiendo...', tipo: 'informativo' });
      setTimeout(() => navigate('/'), 800); 
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' });
    } finally {
      setCargando(false); 
    }
  };

  return (
    <>
      {cargando ? (
        <Cargando /> 
      ) : (
        <form onSubmit={manejarSubmit}>
          <h1>Crear Evento</h1>
          {mensaje.texto && (
            <div className={`mensaje ${mensaje.tipo === 'error' ? 'mensaje-error' : 'mensaje-informativo'}`}>
              {mensaje.texto}
            </div>
          )}
          <label>
            Título:
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </label>
          <label>
            Fecha:
            <input 
              type="datetime-local" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
              required 
              min={fechaMinima} 
            />
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
      )}
    </>
  );
}

export default CrearEvento;
