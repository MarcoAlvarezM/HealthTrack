const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
  dia: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true }
});

const doctorSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  especialidad: { type: String, required: true },
  telefono: { type: String, required: true },

  horarioDisponible: [horarioSchema], // Array de objetos

  creado: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Doctor', doctorSchema, 'Doctores');