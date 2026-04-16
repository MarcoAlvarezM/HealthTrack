const express = require("express");
const router = express.Router();

const Alertas = require("../models/Alertas");

// Obtener todas
router.get("/", async (req, res) => {
  try {
    const alertas = await Alertas.find()
      .populate("paciente_id")
      .populate("doctor_id")
      .populate("regla_id");
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alertas" });
  }
});

// Obtener una por ID
router.get("/:id", async (req, res) => {
  try {
    const alerta = await Alertas.findById(req.params.id)
      .populate("paciente_id")
      .populate("doctor_id")
      .populate("regla_id");
    res.json(alerta);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al obtener alerta" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Normalizar severidad
    if (req.body.severidad) {
      req.body.severidad = req.body.severidad.toLowerCase();
    }

    const nueva = new Alertas(req.body);
    const guardado = await nueva.save();
    res.json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear alerta", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Alertas.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar alerta" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Alertas.findByIdAndUpdate(req.params.id, {
      activo: false,
    });
    res.json({ mensaje: "Alerta desactivada" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar alerta" });
  }
});

module.exports = router;
