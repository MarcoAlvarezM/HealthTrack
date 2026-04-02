const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },

  usuario_id: {
    type: Number,
    required: true
  },

  nombre: {
    type: String,
    required: true
  },

  apellido: {
    type: String,
    required: true
  },

  fechaNacimiento: {
    type: Date,
    required: true
  },

  genero: {
    type: String,
    enum: ["masculino", "femenino"],
    required: true
  },

  peso: {
    type: Number,
    required: true
  },

  altura: {
    type: Number,
    required: true
  },

  tipoSangre: {
    type: String,
    required: true
  },

  padecimientos: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Pacientes", PacienteSchema);