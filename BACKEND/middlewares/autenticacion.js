const jwt = require('jsonwebtoken');

const autenticarUsuario = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = autenticarUsuario;
