import { getData, postData, putData, deleteData } from "./js/app.js";

const endpoint = "usuarios";

const tabla = document.getElementById("tabla");

document.addEventListener("DOMContentLoaded", listar);

async function listar() {
  const data = await getData(endpoint);
  tabla.innerHTML = "";

  data.forEach(u => {
    tabla.innerHTML += `
      <tr>
        <td>${u.correo}</td>
        <td>${u.role}</td>
        <td>${u.activo ? "Sí" : "No"}</td>
        <td>
          <button onclick="editar('${u._id}','${u.correo}','${u.role}')">Editar</button>
          <button onclick="eliminar('${u._id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

window.editar = (idVal, correoVal, roleVal) => {
  document.getElementById("id").value = idVal;
  correo.value = correoVal;
  role.value = roleVal;
};

window.eliminar = async (id) => {
  await deleteData(endpoint, id);
  listar();
};