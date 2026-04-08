const mongoose = require("mongoose");

const CondicionSchema = new mongoose.Schema({
  sintoma: {
    type: String,
    required: true
  },

  operador: {
    type: String,
    enum: [">=", "<=", "==", "!=", ">", "<"],
    required: true
  },

  valor: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  diasConsecutivos: {
    type: Number,
    default: 1
  }
}, { _id: false });

const ReglasAlertasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },

  condicion: {
    type: CondicionSchema,
    required: true
  },

  severidad: {
    type: String,
    enum: ["baja", "media", "alta"],
    required: true
  },

  notificarDoctor: {
    type: Boolean,
    default: true
  },

  activa: {
    type: Boolean,
    default: true
  },

  creado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ReglasAlertas", ReglasAlertasSchema, "ReglasAlertas");
