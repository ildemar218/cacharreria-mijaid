const API = "http://localhost:3000/api/detalle-pedido";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function agregarDetalle(detalle) {
  const respuesta = await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(detalle),
  });

  return await respuesta.json();
}

export async function obtenerDetalle(idPedido) {
  const respuesta = await fetch(`${API}/${idPedido}`, {
    headers: headers(),
  });

  return await respuesta.json();
}