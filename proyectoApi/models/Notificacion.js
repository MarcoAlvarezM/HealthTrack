const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  usuario_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },

  alerta_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Alertas', 
    required: true 
  },

  mensaje: { 
    type: String, 
    required: true 
  },

  leido: { 
    type: Boolean, 
    default: false 
  },

  enviado: { 
    type: Date, 
    default: Date.now 
  }

});

module.exports = mongoose.model('Notificacion', notificacionSchema, 'Notificaciones');