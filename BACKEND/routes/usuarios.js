const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const router = express.Router();

router.post('/registrar', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
    let usuario = await Usuario.findOne({ correo });
    if (usuario) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    usuario = new Usuario({ nombre, correo, contrasena });
    await usuario.save();

    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
  } catch (error) {
    console.error('Error en el servidor:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
    }

    const esContrasenaValida = await usuario.compararcontrasena(contrasena);
    if (!esContrasenaValida) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
  } catch (error) {
    console.error('Error en el servidor:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});



module.exports = router;
