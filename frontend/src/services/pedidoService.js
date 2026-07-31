const API = "http://localhost:3000/api/pedidos";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function listarPedidos() {
  const respuesta = await fetch(API, {
    headers: headers(),
  });

  return await respuesta.json();
}

export async function crearPedido(pedido) {
  const respuesta = await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(pedido),
  });

  return await respuesta.json();
}