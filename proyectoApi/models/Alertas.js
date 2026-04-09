const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },

  paciente_id: {
    type: Number,
    required: true,
    ref: 'Pacientes'
  },

  doctor_id: {
    type: Number,
    required: true,
    ref: 'Doctor'
  },

  regla_id: {
    type: Number,
    required: true,
    ref: 'ReglasAlertas'
  },

  activadoEn: {
    type: Date,
    required: true
  },

  severidad: {
    type: String,
    enum: ['baja', 'media', 'alta', 'Alta'], 
    required: true
  },

  mensaje: {
    type: String,
    required: true
  },

  estado: {
    type: String,
    enum: ['pendiente', 'atendida', 'cancelada'],
    default: 'pendiente'
  },

  activo: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Alertas', alertaSchema, 'Alertas');