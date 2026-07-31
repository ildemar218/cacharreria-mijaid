const API = "http://localhost:3000/api/categorias";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function listarCategorias() {
  const respuesta = await fetch(API, {
    headers: headers(),
  });

  return await respuesta.json();
}

export async function crearCategoria(categoria) {
  const respuesta = await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(categoria),
  });

  return await respuesta.json();
}