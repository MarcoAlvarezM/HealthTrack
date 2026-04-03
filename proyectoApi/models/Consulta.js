const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
  paciente_id: { 
    type: Number, 
    ref: 'Pacientes', 
    required: true 
  },

  doctor_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },

  fecha: { 
    type: Date, 
    required: true 
  },

  diagnostico: { 
    type: String, 
    required: true 
  },

  notas: { 
    type: String 
  },

  estado: { 
    type: String, 
    enum: ['pendiente', 'confirmada', 'cancelada'], 
    default: 'pendiente' 
  },

  creado: { 
    type: Date, 
    default: Date.now 
  },

  activo: { 
    type: Boolean, 
    default: true 
  }
});

module.exports = mongoose.model('Consulta', consultaSchema, 'Consultas');