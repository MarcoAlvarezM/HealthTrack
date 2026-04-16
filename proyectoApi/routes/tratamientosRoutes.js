const express = require("express");
const router = express.Router();

const Tratamientos = require("../models/tratamientos");


router.get("/", async (req, res) => {
  try {
    const datos = await Tratamientos.find()
      .populate("consulta_id")
      .populate("paciente_id")
      .populate("doctor_id")
      .populate("medicamentos.medicamento_id");

    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tratamientos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevo = new Tratamientos(req.body);
    const guardado = await nuevo.save();
    res.json(guardado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al guardar tratamiento",
      detalle: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tratamiento = await Tratamientos.findById(req.params.id)
      .populate("consulta_id")
      .populate("paciente_id")
      .populate("doctor_id")
      .populate("medicamentos.medicamento_id");

    if (!tratamiento) {
      return res.status(404).json({ mensaje: "Tratamiento no encontrado" });
    }

    res.json(tratamiento);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al obtener tratamiento" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Tratamientos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar tratamiento",
      detalle: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Tratamientos.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Tratamiento eliminado correctamente" });
  } catch {
    res.status(400).json({ mensaje: "Error al eliminar tratamiento" });
  }
});

module.exports = router;
