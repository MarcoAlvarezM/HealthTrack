const express = require("express");
const router = express.Router();

const Medicamentos = require("../models/medicamentos");
const { registrarAuditoria } = require("../utils/auditLogger");

// Obtener todos
router.get("/", async (req, res) => {
  const datos = await Medicamentos.find();
  res.json(datos);
});

// Obtener uno por ID
router.get("/:id", async (req, res) => {
  try {
    const medicamento = await Medicamentos.findById(req.params.id);

    if (!medicamento) {
      return res.status(404).json({ mensaje: "Medicamento no encontrado" });
    }

    res.json(medicamento);
  } catch {
    res.status(400).json({ mensaje: "Error al obtener medicamento" });
  }
});

// Crear
router.post("/", async (req, res) => {
  const nuevo = new Medicamentos(req.body);
  const guardado = await nuevo.save();
  await registrarAuditoria({
    accion: "CREATE",
    coleccion: "Medicamentos",
    documentoId: guardado._id,
    detalles: `Medicamento creado: ${guardado.nombre}`,
  });
  res.json(guardado);
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Medicamentos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (actualizado) {
      await registrarAuditoria({
        accion: "UPDATE",
        coleccion: "Medicamentos",
        documentoId: actualizado._id,
        detalles: `Medicamento actualizado: ${actualizado.nombre}`,
      });
    }
    res.json(actualizado);
  } catch {
    res.status(400).json({ mensaje: "Error al actualizar medicamento" });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Medicamentos.findByIdAndDelete(req.params.id);
    if (eliminado) {
      await registrarAuditoria({
        accion: "DELETE",
        coleccion: "Medicamentos",
        documentoId: eliminado._id,
        detalles: `Medicamento eliminado: ${eliminado.nombre}`,
      });
    }
    res.json({ mensaje: "Medicamento eliminado" });
  } catch {
    res.status(400).json({ mensaje: "Error al eliminar medicamento" });
  }
});

module.exports = router;
