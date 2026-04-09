const express = require("express");
const router = express.Router();

// Importar el modelo Consulta
const Consulta = require('../models/Consulta');

// GET: Obtener todas las consultas
router.get("/", async (req, res) => {
  try {
    const consultas = await Consulta.find()
      .populate('paciente_id')
      .populate('doctor_id'); 

    res.json(consultas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las consultas" });
  }
});

// GET: Obtener una consulta por ID
router.get("/:id", async (req, res) => {
  try {
    const consulta = await Consulta.findById(req.params.id)
      .populate('paciente_id')
      .populate('doctor_id');

    if (!consulta) {
      return res.status(404).json({ error: "Consulta no encontrada" });
    }

    res.json(consulta);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la consulta" });
  }
});

// POST: Crear una nueva consulta
router.post("/", async (req, res) => {
  try {
    const nuevaConsulta = new Consulta(req.body);
    const consultaGuardada = await nuevaConsulta.save();
    res.json(consultaGuardada);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la consulta" });
  }
});

// PUT: Actualizar una consulta por ID
router.put("/:id", async (req, res) => {
  try {
    const consultaActualizada = await Consulta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!consultaActualizada) {
      return res.status(404).json({ error: "Consulta no encontrada" });
    }

    res.json(consultaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la consulta" });
  }
});

// DELETE: Eliminar una consulta por ID
router.delete("/:id", async (req, res) => {
  try {
    const consultaEliminada = await Consulta.findByIdAndDelete(req.params.id);

    if (!consultaEliminada) {
      return res.status(404).json({ error: "Consulta no encontrada" });
    }

    res.json({ message: "Consulta eliminada", consultaEliminada });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la consulta" });
  }
});

module.exports = router;