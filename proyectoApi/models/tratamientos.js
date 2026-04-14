const mongoose = require("mongoose");

const TratamientoSchema = new mongoose.Schema({

  consulta_id: {
    type: Number,
    required: true
  },

  paciente_id: {
    type: Number,
    required: true
  },

  doctor_id: {
    type: Number,
    required: true
  },

  fecha_inicio: {
    type: Date,
    required: true
  },

  fecha_fin: {
    type: Date,
    required: true
  },

  instrucciones: {
    type: String,
    required: true
  },

  medicamentos: [
    {
      medicamento_id: {
        type: Number,
        required: true
      },
      dosis: {
        type: String,
        required: true
      },
      frecuencia: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Tratamientos", TratamientoSchema);