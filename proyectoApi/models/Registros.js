const mongoose = require("mongoose");

const RegistroSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: false,
    default: null
  },

  accion: {
    type: String,
    required: true
  },

  coleccion: {
    type: String,
    required: true
  },

  documentoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  marca_temporal: {
    type: Date,
    default: Date.now
  },

  detalles: {
    type: String,
    default: ""
  },

  creado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Registro", RegistroSchema, "Registros");
