const express = require("express");
const router = express.Router();

const Pacientes = require("../models/pacientes");
const { registrarAuditoria } = require("../utils/auditLogger");

// Obtener uno por ID
router.get("/:id", async (req, res) => {
  try {
    const paciente = await Pacientes.findById(req.params.id)
      .populate('usuario_id', 'correo role');

    if (!paciente) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }

    res.json(paciente);

  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: "Error al obtener paciente" });
  }
});

// Obtener todos
router.get("/", async (req, res) => {
  try {
    const pacientes = await Pacientes.find()
      .populate('usuario_id', 'correo role');

    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
});

// Crear
router.post("/", async (req, res) => {
  const nuevo = new Pacientes(req.body);
  const guardado = await nuevo.save();
  await registrarAuditoria({
    usuarioId: guardado.usuario_id,
    accion: "CREATE",
    coleccion: "Pacientes",
    documentoId: guardado._id,
    detalles: `Paciente creado: ${guardado.nombre} ${guardado.apellido}`,
  });
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
    await registrarAuditoria({
      usuarioId: actualizado?.usuario_id,
      accion: "UPDATE",
      coleccion: "Pacientes",
      documentoId: actualizado?._id,
      detalles: `Paciente actualizado: ${actualizado?.nombre || ""} ${actualizado?.apellido || ""}`.trim(),
    });
    res.json(actualizado);
  } catch {
    res.status(400).json({ mensaje: "Error al actualizar paciente" });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Pacientes.findByIdAndDelete(req.params.id);
    if (eliminado) {
      await registrarAuditoria({
        usuarioId: eliminado.usuario_id,
        accion: "DELETE",
        coleccion: "Pacientes",
        documentoId: eliminado._id,
        detalles: `Paciente eliminado: ${eliminado.nombre} ${eliminado.apellido}`,
      });
    }
    res.json({ mensaje: "Paciente eliminado" });
  } catch {
    res.status(400).json({ mensaje: "Error al eliminar paciente" });
  }
});

module.exports = router;
