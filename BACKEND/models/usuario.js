const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }, 
});

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next(); 
  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
  next();
});

usuarioSchema.methods.compararcontrasena = function(contrasenaIngresada) {
  return bcrypt.compare(contrasenaIngresada, this.contrasena); 
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
