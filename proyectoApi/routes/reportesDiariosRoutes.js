const express = require("express");
const router = express.Router();
const ReportesDiarios = require("../models/ReportesDiarios");

//Obtener todos los reportes diarios
router.get("/", async (req, res) => {
  try {
    const reportes = await ReportesDiarios.find()
      .populate("pacienteId")
      .populate("planTratamientoId");
    res.json(reportes);
  } catch (error) {
    res.status(500).json({error: "Error al obtener los reportes"});
  }
});

//Obtener reportes por paciente
router.get("/paciente/:pacienteId", async (req, res) => {
  try {
    const reportes = await ReportesDiarios.find({pacienteId: req.params.pacienteId})
      .populate("pacienteId")
      .populate("planTratamientoId");
    res.json(reportes);
  } catch (error) {
    res.status(500).json({error: "Error al obtener los reportes del paciente"});
  }
});

//Obtener un reporte por ID
router.get("/:id", async (req, res) => {
  try {
    const reporte = await ReportesDiarios.findById(req.params.id)
      .populate("pacienteId")
      .populate("planTratamientoId");

    if (!reporte) {
      return res.status(404).json({error: "Reporte no encontrado"});
    }

    res.json(reporte);
  } catch (error) {
    res.status(500).json({error: "Error al obtener el reporte"});
  }
});

//Crear un nuevo reporte diario
router.post("/", async (req, res) => {
  try {
    const nuevoReporte = new ReportesDiarios(req.body);
    const reporteGuardado = await nuevoReporte.save();
    res.json(reporteGuardado);
  } catch (error) {
    res.status(400).json({error: "Error al crear el reporte"});
  }
});

//Actualizar un reporte por ID
router.put("/:id", async (req, res) => {
  try {
    const reporteActualizado = await ReportesDiarios.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!reporteActualizado) {
      return res.status(404).json({error: "Reporte no encontrado"});
    }

    res.json(reporteActualizado);
  } catch (error) {
    res.status(500).json({error: "Error al actualizar el reporte"});
  }
});

//Eliminar un reporte por ID
router.delete("/:id", async (req, res) => {
  try {
    const reporteEliminado = await ReportesDiarios.findByIdAndDelete(req.params.id);

    if (!reporteEliminado) {
      return res.status(404).json({error: "Reporte no encontrado"});
    }

    res.json({ message: "Reporte eliminado", reporteEliminado });
  } catch (error) {
    res.status(500).json({error: "Error al eliminar el reporte"});
  }
});

module.exports = router;
