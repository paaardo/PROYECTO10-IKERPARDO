const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
});

// Hashear la contraseña antes de guardarla
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

usuarioSchema.methods.compararContraseña = function(contraseñaIngresada) {
  return bcrypt.compare(contraseñaIngresada, this.contraseña);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
