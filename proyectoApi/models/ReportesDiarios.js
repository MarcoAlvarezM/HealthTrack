const mongoose = require("mongoose");

const ReporteDiarioSchema = new mongoose.Schema({
  pacienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pacientes",
    required: true
  },

  planTratamientoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tratamientos",
    required: true
  },

  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },

  medicamentoTomado: {
    type: Boolean,
    required: true
  },

  sintomas: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },

  estado: {
    type: String,
    enum: ["bueno", "regular", "malo"],
    required: true
  },

  notas: {
    type: String,
    default: ""
  },

  creado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ReporteDiario", ReporteDiarioSchema, "ReportesDiarios");
