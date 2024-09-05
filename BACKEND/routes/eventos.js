const express = require('express');
const Evento = require('../models/evento');
const autenticarUsuario = require('../middlewares/autenticacion');
const subirFichero = require('../middlewares/subirFichero');

const router = express.Router();

// Ruta para obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.find().populate('asistentes', 'nombre');
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Ruta para crear un nuevo evento con cartel (requiere autenticación)
router.post('/', autenticarUsuario, subirFichero.single('cartel'), async (req, res) => {
  const { titulo, fecha, ubicacion, descripcion } = req.body;
  const cartel = req.file ? req.file.filename : null; // Guarda solo el nombre del archivo

  try {
    const nuevoEvento = new Evento({
      titulo,
      fecha,
      ubicacion,
      descripcion,
      cartel,
      asistentes: [],
    });

    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


// Ruta para confirmar asistencia a un evento (requiere autenticación)
router.post('/:id/asistir', autenticarUsuario, async (req, res) => {
    try {
      const evento = await Evento.findById(req.params.id);
  
      if (!evento) {
        return res.status(404).json({ mensaje: 'Evento no encontrado' });
      }
  
      // Verificar si el usuario ya está en la lista de asistentes
      if (!evento.asistentes.includes(req.usuario.id)) {
        evento.asistentes.push(req.usuario.id);
        await evento.save();
        return res.json({ mensaje: 'Asistencia confirmada', evento });
      } else {
        return res.status(400).json({ mensaje: 'Ya has confirmado asistencia a este evento' });
      }
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  });
  
// Obtener eventos ordenados por fecha
router.get('/ordenados', async (req, res) => {
  console.log('Solicitud recibida en /api/eventos/ordenados');
  try {
    const eventos = await Evento.find().sort({ fecha: 1 });
    console.log('Eventos obtenidos:', eventos);

    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener los eventos', error: error.message });
  }
});

// Ruta para obtener los detalles de un evento específico
router.get('/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('asistentes', 'nombre');
    if (!evento) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
    res.json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


  
module.exports = router;
