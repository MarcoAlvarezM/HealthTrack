const express = require("express");
const router = express.Router();

const CatalogoSintomas = require("../models/CatalogoSintomas");

router.get("/", async (req, res) => {
  try {
    const sintomas = await CatalogoSintomas.find();
    res.json(sintomas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener síntomas" });
  }
});

// Obtener uno por ID
router.get("/:id", async (req, res) => {
  try {
    const sintoma = await CatalogoSintomas.findById(req.params.id);
    res.json(sintoma);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al obtener síntoma" });
  }
});


router.post("/", async (req, res) => {
  try {
    const nuevo = new CatalogoSintomas(req.body);
    const guardado = await nuevo.save();
    res.json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear síntoma", error });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const actualizado = await CatalogoSintomas.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar síntoma" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await CatalogoSintomas.findByIdAndUpdate(req.params.id, {
      activo: false
    });
    res.json({ mensaje: "Síntoma desactivado" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar síntoma" });
  }
});

module.exports = router;