const API = "http://localhost:3000/api/productos";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function obtenerProductos() {
  const respuesta = await fetch(API, {
    headers: headers(),
  });

  return await respuesta.json();
}

export async function crearProducto(producto) {
  const respuesta = await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(producto),
  });

  return await respuesta.json();
}