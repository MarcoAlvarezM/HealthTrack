const express = require("express");
const router = express.Router();

// Importar el modelo Usuario
const Usuario = require('../models/Usuario');  

// GET: Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// POST: Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el usuario" });
  }
});

// PUT: Actualizar un usuario por ID
router.put("/:id", async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,  // ID del usuario a actualizar
      req.body,       // Nuevos datos
      { new: true }   // Retornar el documento actualizado
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// DELETE: Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado", usuarioEliminado });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

module.exports = router;