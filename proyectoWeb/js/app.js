const API_BASE = "http://localhost:3000/api";

// GET
export async function getData(endpoint) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  return await res.json();
}

// POST
export async function postData(endpoint, data) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return await res.json(); 
}

// PUT
export async function putData(endpoint, id, data) {
  await fetch(`${API_BASE}/${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// DELETE
export async function deleteData(endpoint, id) {
  await fetch(`${API_BASE}/${endpoint}/${id}`, {
    method: "DELETE"
  });

  

}