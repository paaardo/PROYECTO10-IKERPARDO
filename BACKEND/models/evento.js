const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  fecha: { type: Date, required: true },
  ubicacion: { type: String, required: true },
  descripcion: { type: String, required: true },
  cartel: { type: String },
  asistentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});

module.exports = mongoose.model('Evento', EventoSchema);
