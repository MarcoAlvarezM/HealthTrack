const express = require("express");
const router = express.Router();

const Tratamientos = require("../models/tratamientos");


router.get("/", async (req, res) => {
  try {
    const datos = await Tratamientos.aggregate([
      {
        $lookup: {
          from: "pacientes",
          localField: "paciente_id",
          foreignField: "_id",
          as: "paciente"
        }
      },
      { $unwind: "$paciente" },
      {
        $lookup: {
          from: "medicamentos",
          localField: "medicamentos.medicamento_id",
          foreignField: "_id",
          as: "medicamentos_info"
        }
      }
    ]);

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
  } catch {
    res.status(400).json({ mensaje: "Error al guardar tratamiento" });
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
  } catch {
    res.status(400).json({ mensaje: "Error al actualizar tratamiento" });
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