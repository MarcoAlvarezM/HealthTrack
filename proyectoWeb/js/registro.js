import { postData } from "./js/app.js";

const role = document.getElementById("role");
const pacienteFields = document.getElementById("pacienteFields");
const doctorFields = document.getElementById("doctorFields");

// Cambiar formulario según rol
role.addEventListener("change", () => {
  if (role.value === "Paciente") {
    pacienteFields.style.display = "block";
    doctorFields.style.display = "none";
  } else {
    pacienteFields.style.display = "none";
    doctorFields.style.display = "block";
  }
});

document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault();

  try {
    // 1. Crear usuario
    const usuario = await postData("usuarios", {
      correo: document.getElementById("correo").value,
      contrasena: document.getElementById("contrasena").value,
      role: role.value
    });

    console.log("USUARIO:", usuario);

    // 2. Crear perfil según rol
    if (role.value === "Paciente") {
      await postData("pacientes", {
        usuario_id: usuario._id,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        genero: document.getElementById("genero").value,
        tipoSangre: document.getElementById("tipoSangre").value
      });
    }

    if (role.value === "Doctor") {
      await postData("doctores", {
        usuario_id: usuario._id,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellido").value,
        especialidad: document.getElementById("especialidad").value,
        telefono: document.getElementById("telefono").value
      });
    }

    alert("Registro completo");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("Error en el registro");
  }
});