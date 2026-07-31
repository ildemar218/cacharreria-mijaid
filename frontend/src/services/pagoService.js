const API = "http://localhost:3000/api/pagos";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function listarPagos() {
  const respuesta = await fetch(API, {
    headers: headers(),
  });

  return await respuesta.json();
}

export async function crearPago(pago) {
  const respuesta = await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(pago),
  });

  return await respuesta.json();
}