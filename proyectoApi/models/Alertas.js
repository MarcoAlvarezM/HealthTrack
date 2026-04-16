const mongoose = require("mongoose");

const alertaSchema = new mongoose.Schema({
  paciente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pacientes",
    required: true,
  },

  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  regla_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReglasAlertas",
    required: true,
  },

  activadoEn: {
    type: Date,
    required: true,
  },

  severidad: {
    type: String,
    enum: ["baja", "media", "alta", "Alta"],
    required: true,
  },

  mensaje: {
    type: String,
    required: true,
  },

  estado: {
    type: String,
    enum: ["pendiente", "atendida", "cancelada"],
    default: "pendiente",
  },

  activo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Alertas", alertaSchema, "Alertas");
