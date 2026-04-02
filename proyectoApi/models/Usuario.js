const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  role: { type: String, required: true, enum: ['Paciente', 'Doctor'] },
  creado: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);