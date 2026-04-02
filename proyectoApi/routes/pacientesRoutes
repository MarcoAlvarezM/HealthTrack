const express = require("express");
const router = express.Router();

const Pacientes = require("../models/pacientes");

// Obtener todos
router.get("/", async (req, res) => {
  const pacientes = await Pacientes.find();
  res.json(pacientes);
});

// Crear
router.post("/", async (req, res) => {
  const nuevo = new Pacientes(req.body);
  const guardado = await nuevo.save();
  res.json(guardado);
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Pacientes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch {
    res.status(400).json({ mensaje: "Error al actualizar paciente" });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Pacientes.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Paciente eliminado" });
  } catch {
    res.status(400).json({ mensaje: "Error al eliminar paciente" });
  }
});

module.exports = router;