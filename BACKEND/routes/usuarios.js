const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const autenticarUsuario = require('../middlewares/autenticacion');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/registrar', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    // Verificar si el correo ya está registrado
    let usuario = await Usuario.findOne({ correo });
    if (usuario) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Crear un nuevo usuario
    usuario = new Usuario({ nombre, correo, contraseña });
    await usuario.save();

    // Crear un token JWT
    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Verificar si el usuario existe
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const esContraseñaValida = await usuario.compararContraseña(contraseña);
    if (!esContraseñaValida) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;
