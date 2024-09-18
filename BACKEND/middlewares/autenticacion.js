const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const autenticarUsuario = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se devolvió token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;

    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = autenticarUsuario;
