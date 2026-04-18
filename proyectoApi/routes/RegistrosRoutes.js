const express = require("express");
const router = express.Router();
const Registros = require("../models/Registros");

//Obtener todos los registros
router.get("/", async (req, res) => {
  try {
    const filtros = {};

    if (req.query.accion) {
      filtros.accion = req.query.accion;
    }

    if (req.query.coleccion) {
      filtros.coleccion = req.query.coleccion;
    }

    if (req.query.fecha) {
      const inicio = new Date(req.query.fecha);
      const fin = new Date(req.query.fecha);
      fin.setDate(fin.getDate() + 1);

      filtros.marca_temporal = {
        $gte: inicio,
        $lt: fin,
      };
    }

    const logs = await Registros.find(filtros)
      .populate("usuarioId")
      .sort({marca_temporal: -1});
    res.json(logs);
  } catch (error) {
    res.status(500).json({error: "Error al obtener los registros"});
  }
});

//Obtener registros por usuario
router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const logs = await Registros.find({usuarioId: req.params.usuarioId})
      .populate("usuarioId")
      .sort({ marca_temporal: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({error: "Error al obtener los registros del usuario"});
  }
});

//Obtener registros por colección
router.get("/coleccion/:coleccion", async (req, res) => {
  try {
    const logs = await Registros.find({coleccion: req.params.coleccion})
      .populate("usuarioId")
      .sort({marca_temporal: -1});
    res.json(logs);
  } catch (error) {
    res.status(500).json({error: "Error al obtener los registros de la colección"});
  }
});

//Obtener registros por acción
router.get("/accion/:accion", async (req, res) => {
  try {
    const logs = await Registros.find({accion: req.params.accion})
      .populate("usuarioId")
      .sort({marca_temporal: -1});
    res.json(logs);
  } catch (error) {
    res.status(500).json({error: "Error al obtener los registros por acción"});
  }
});

//Obtener un registro por ID
router.get("/:id", async (req, res) => {
  try {
    const log = await Registros.findById(req.params.id).populate("usuarioId");

    if (!log) {
      return res.status(404).json({error: "Registro no encontrado"});
    }

    res.json(log);
  } catch (error) {
    res.status(500).json({error: "Error al obtener el registro"});
  }
});

//Crear un nuevo registro
router.post("/", async (req, res) => {
  try {
    const nuevoLog = new Registros(req.body);
    const logGuardado = await nuevoLog.save();
    res.json(logGuardado);
  } catch (error) {
    res.status(400).json({error: "Error al crear el registro"});
  }
});

//Actualizar un registro por ID
router.put("/:id", async (req, res) => {
  try {
    const logActualizado = await Registros.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );

    if (!logActualizado) {
      return res.status(404).json({error: "Registro no encontrado"});
    }

    res.json(logActualizado);
  } catch (error) {
    res.status(500).json({error: "Error al actualizar el registro"});
  }
});

//Eliminar un registro por ID (uso limitado)
router.delete("/:id", async (req, res) => {
  try {
    const logEliminado = await Registros.findByIdAndDelete(req.params.id);

    if (!logEliminado) {
      return res.status(404).json({error: "Registro no encontrado"});
    }

    res.json({message: "Registro eliminado", logEliminado});
  } catch (error) {
    res.status(500).json({error: "Error al eliminar el registro"});
  }
});

module.exports = router;
