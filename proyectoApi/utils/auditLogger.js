const Registros = require("../models/Registros");

async function registrarAuditoria({
  usuarioId = null,
  accion,
  coleccion,
  documentoId,
  detalles = "",
}) {
  try {
    await Registros.create({
      ...(usuarioId ? { usuarioId } : {}),
      accion,
      coleccion,
      documentoId,
      detalles:
        typeof detalles === "string" ? detalles : JSON.stringify(detalles),
    });
  } catch (error) {
    console.error("Error al registrar auditoria:", error.message);
  }
}

module.exports = { registrarAuditoria };
