import { getData, deleteData } from "./app.js";

const endpoint = "doctores";

document.addEventListener("DOMContentLoaded", listar);

async function listar() {
  const data = await getData(endpoint);
  tabla.innerHTML = "";

  data.forEach(d => {
    tabla.innerHTML += `
      <tr>
        <td>${d.usuario_id?.correo || "N/A"}</td>
        <td>${d.nombre} ${d.apellidos}</td>
        <td>${d.especialidad || "-"}</td>
        <td>${d.telefono || "-"}</td>
        <td>
          <button onclick="eliminar('${d._id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

window.eliminar = async (id) => {
  await deleteData(endpoint, id);
  listar();
};