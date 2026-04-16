const express = require("express");
const router = express.Router();

// Importar el modelo Notificacion
const Notificacion = require('../models/Notificacion');

// GET: Obtener todas las notificaciones
router.get("/", async (req, res) => {
  try {
    const notificaciones = await Notificacion.find()
      .populate('usuario_id')
      .populate('alerta_id');

    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las notificaciones" });
  }
});

// GET: Obtener una notificación por ID
router.get("/:id", async (req, res) => {
  try {
    const notificacion = await Notificacion.findById(req.params.id)
      .populate('usuario_id')
      .populate('alerta_id');

    if (!notificacion) {
      return res.status(404).json({ error: "Notificación no encontrada" });
    }

    res.json(notificacion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la notificación" });
  }
});

// POST: Crear una nueva notificación
router.post("/", async (req, res) => {
  try {
    const nuevaNotificacion = new Notificacion(req.body);
    const notificacionGuardada = await nuevaNotificacion.save();
    res.json(notificacionGuardada);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la notificación" });
  }
});

// PUT: Actualizar una notificación por ID
router.put("/:id", async (req, res) => {
  try {
    const notificacionActualizada = await Notificacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );

    if (!notificacionActualizada) {
      return res.status(404).json({ error: "Notificación no encontrada" });
    }

    res.json(notificacionActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la notificación" });
  }
});

// DELETE: Eliminar una notificación por ID
router.delete("/:id", async (req, res) => {
  try {
    const notificacionEliminada = await Notificacion.findByIdAndDelete(req.params.id);

    if (!notificacionEliminada) {
      return res.status(404).json({ error: "Notificación no encontrada" });
    }

    res.json({ message: "Notificación eliminada", notificacionEliminada });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la notificación" });
  }
});

module.exports = router;