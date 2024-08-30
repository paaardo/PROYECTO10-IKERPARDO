const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const autenticarUsuario = require('../middlewares/autenticacion');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/registrar', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
    // Verificar si el correo ya está registrado
    let usuario = await Usuario.findOne({ correo });
    if (usuario) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Crear un nuevo usuario
    usuario = new Usuario({ nombre, correo, contrasena });
    await usuario.save();

    // Crear un token JWT
    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
  } catch (error) {
    console.error('Error en el servidor:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  console.log('Contraseña recibida:', contrasena); // Confirmar que la contraseña es la esperada

  try {
    // Verificar si el usuario existe
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
    }

    console.log('Contraseña en la base de datos:', usuario.contrasena); // Asegúrate de que la contraseña no es undefined

    // Verificar la contraseña
    const esContrasenaValida = await usuario.compararcontrasena(contrasena); // Llama al método correctamente
    if (!esContrasenaValida) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Crear un token JWT
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
