import React, { useState } from 'react';

function SubirArchivo() {
  const [archivo, setArchivo] = useState(null);

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('archivo', archivo);

    try {
      const respuesta = await fetch('http://localhost:5000/api/subir', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!respuesta.ok) {
        throw new Error('Error al subir el archivo');
      }
      alert('Archivo subido exitosamente');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h1>Subir Archivo</h1>
      <input type="file" onChange={manejarArchivo} />
      <button type="submit">Subir</button>
    </form>
  );
}

export default SubirArchivo;
