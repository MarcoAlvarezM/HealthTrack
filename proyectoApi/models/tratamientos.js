const mongoose = require("mongoose");

const TratamientoSchema = new mongoose.Schema({
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

  consulta_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consulta",
    required: true,
  },
  fecha_inicio: {
    type: Date,
    required: true,
  },

  fecha_fin: {
    type: Date,
    required: true,
  },

  instrucciones: {
    type: String,
    required: true,
  },

  medicamentos: [
    {
      medicamento_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicamentos",
        required: true,
      },
      dosis: {
        type: String,
        required: true,
      },
      frecuencia: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Tratamientos", TratamientoSchema);
