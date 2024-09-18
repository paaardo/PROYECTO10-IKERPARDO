import React, { useState } from 'react';

function SubirArchivo() {
  const [archivo, setArchivo] = useState(null);

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      console.error('Por favor, seleccione un archivo.');
      return;
    }

    const extension = archivo.name.split('.').pop().toLowerCase();
    const extensionesPermitidas = ['jpg', 'jpeg', 'png'];

    if (!extensionesPermitidas.includes(extension)) {
      console.error('Solo se permiten archivos JPG, JPEG o PNG');
      return;
    }

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

      console.log('Archivo subido exitosamente');
    } catch (error) {
      console.error('Error al subir el archivo:', error.message);
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
