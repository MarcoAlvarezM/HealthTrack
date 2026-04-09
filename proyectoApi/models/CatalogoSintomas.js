const mongoose = require('mongoose');

const catalogoSintomasSchema = new mongoose.Schema({
  id_: {
    type: Number,
    required: true,
    unique: true
  },

  nombre: {
    type: String,
    required: true
  },

  etiqueta: {
    type: String,
    required: true
  },

  tipo: {
    type: String,
    enum: ['escala', 'booleano', 'texto'],
    required: true
  },

  escalaMinima: {
    type: Number,
    required: function () {
      return this.tipo === 'escala';
    }
  },

  escalaMaxima: {
    type: Number,
    required: function () {
      return this.tipo === 'escala';
    }
  },

  condicionesRelacionadas: [
    {
      type: String
    }
  ],

  umbralAlerta: {
    type: Number
  },
});

// Nombre del modelo y colección
module.exports = mongoose.model('CatalogoSintomas', catalogoSintomasSchema, 'CatalogoSintomas');