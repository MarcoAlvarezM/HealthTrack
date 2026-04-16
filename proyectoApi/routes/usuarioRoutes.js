const express = require("express");
const router = express.Router();

// Importar el modelo Usuario
const Usuario = require('../models/Usuario');  
const { registrarAuditoria } = require("../utils/auditLogger");

// GET: Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// GET: Obtener usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

// POST: Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    await registrarAuditoria({
      usuarioId: usuarioGuardado._id,
      accion: "CREATE",
      coleccion: "Usuarios",
      documentoId: usuarioGuardado._id,
      detalles: `Usuario creado: ${usuarioGuardado.correo}`,
    });
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

    await registrarAuditoria({
      usuarioId: usuarioActualizado._id,
      accion: "UPDATE",
      coleccion: "Usuarios",
      documentoId: usuarioActualizado._id,
      detalles: `Usuario actualizado: ${usuarioActualizado.correo}`,
    });
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

    await registrarAuditoria({
      usuarioId: usuarioEliminado._id,
      accion: "DELETE",
      coleccion: "Usuarios",
      documentoId: usuarioEliminado._id,
      detalles: `Usuario eliminado: ${usuarioEliminado.correo}`,
    });
    res.json({ message: "Usuario eliminado", usuarioEliminado });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

module.exports = router;
