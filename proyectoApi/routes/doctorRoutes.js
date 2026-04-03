const express = require("express");
const router = express.Router();

// Importar el modelo Doctor
const Doctor = require('../models/Doctor');

// GET: Obtener todos los doctores
router.get("/", async (req, res) => {
  try {
    const doctores = await Doctor.find()
      .populate('usuario_id'); // Trae info del usuario relacionado

    res.json(doctores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los doctores" });
  }
});

// GET: Obtener un doctor por ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('usuario_id');

    if (!doctor) {
      return res.status(404).json({ error: "Doctor no encontrado" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el doctor" });
  }
});

// POST: Crear un nuevo doctor
router.post("/", async (req, res) => {
  try {
    const nuevoDoctor = new Doctor(req.body);
    const doctorGuardado = await nuevoDoctor.save();
    res.json(doctorGuardado);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el doctor" });
  }
});

// PUT: Actualizar un doctor por ID
router.put("/:id", async (req, res) => {
  try {
    const doctorActualizado = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctorActualizado) {
      return res.status(404).json({ error: "Doctor no encontrado" });
    }

    res.json(doctorActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el doctor" });
  }
});

// DELETE: Eliminar un doctor por ID
router.delete("/:id", async (req, res) => {
  try {
    const doctorEliminado = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctorEliminado) {
      return res.status(404).json({ error: "Doctor no encontrado" });
    }

    res.json({ message: "Doctor eliminado", doctorEliminado });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el doctor" });
  }
});

module.exports = router;