import { getData, putData, deleteData } from "./app.js";

const endpoint = "pacientes";
const tabla = document.getElementById("tabla");

document.addEventListener("DOMContentLoaded", listar);

async function listar() {
  const data = await getData(endpoint);
  tabla.innerHTML = "";

  data.forEach(p => {
    tabla.innerHTML += `
      <tr>
        <td>${p.usuario_id?.correo || "N/A"}</td>
        <td>${p.nombre}</td>
        <td>${p.genero}</td>
        <td>${p.tipoSangre}</td>
        <td>
          <button onclick="editar('${p._id}')">Editar</button>
          <button onclick="eliminar('${p._id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

window.eliminar = async (id) => {
  await deleteData(endpoint, id);
  listar();
};