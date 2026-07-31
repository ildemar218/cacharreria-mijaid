const API = "http://localhost:3000/api/clientes";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function listarClientes() {
  const respuesta = await fetch(API, {
    headers: headers(),
  });

  return await respuesta.json();
}

export async function crearCliente(cliente) {
  const respuesta = await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(cliente),
  });

  return await respuesta.json();
}