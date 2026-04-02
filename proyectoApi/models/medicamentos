const mongoose = require("mongoose");

const MedicamentoSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },

  nombre: {
    type: String,
    required: true
  },

  categoria: {
    type: String,
    required: true
  },

  dosisRecomendada: {
    type: String,
    required: true
  },

  efectosSecundarios: [
    {
      type: String
    }
  ],

  requierePrescripcion: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Medicamentos", MedicamentoSchema);