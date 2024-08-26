const jwt = require('jsonwebtoken');

const autenticarUsuario = (req, res, next) => {
  // Obtener el token de los encabezados
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Guardar la información del usuario decodificado en la solicitud
    next(); // Continuar con la ejecución de la siguiente función
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = autenticarUsuario;
