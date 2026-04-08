const express = require("express");
const router = express.Router();
const ReglasAlertas = require("../models/ReglasAlertas");

//Obtener todas las reglas de alerta
router.get("/", async (req, res) => {
  try {
    const reglas = await ReglasAlertas.find();
    res.json(reglas);
  } catch (error) {
    res.status(500).json({error: "Error al obtener las reglas de alerta"});
  }
});

//Obtener reglas de alerta activas
router.get("/activas", async (req, res) => {
  try {
    const reglas = await ReglasAlertas.find({activa: true});
    res.json(reglas);
  } catch (error) {
    res.status(500).json({error: "Error al obtener las reglas de alerta activas"});
  }
});

//Obtener una regla por ID
router.get("/:id", async (req, res) => {
  try {
    const regla = await ReglasAlertas.findById(req.params.id);
    if (!regla) {
      return res.status(404).json({error: "Regla de alerta no encontrada"});
    }
    res.json(regla);
  } catch (error) {
    res.status(500).json({error: "Error al obtener la regla de alerta"});
  }
});

//Crear una nueva regla de alerta
router.post("/", async (req, res) => {
  try {
    const nuevaRegla = new ReglasAlertas(req.body);
    const reglaGuardada = await nuevaRegla.save();
    res.json(reglaGuardada);
  } catch (error) {
    res.status(400).json({error: "Error al crear la regla de alerta"});
  }
});

//Actualizar una regla de alerta por ID
router.put("/:id", async (req, res) => {
  try {
    const reglaActualizada = await ReglasAlertas.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!reglaActualizada) {
      return res.status(404).json({error: "Regla de alerta no encontrada"});
    }

    res.json(reglaActualizada);
  } catch (error) {
    res.status(500).json({error: "Error al actualizar la regla de alerta"});
  }
});

//Eliminar una regla de alerta por ID
router.delete("/:id", async (req, res) => {
  try {
    const reglaEliminada = await ReglasAlertas.findByIdAndDelete(req.params.id);

    if (!reglaEliminada) {
      return res.status(404).json({error: "Regla de alerta no encontrada"});
    }

    res.json({message: "Regla de alerta eliminada", reglaEliminada});
  } catch (error) {
    res.status(500).json({error: "Error al eliminar la regla de alerta"});
  }
});

module.exports = router;
