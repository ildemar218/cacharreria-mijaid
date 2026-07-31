const API = "http://localhost:3000/api/pagos/factura";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function obtenerFactura(id) {

  const respuesta = await fetch(`${API}/${id}`, {
    headers: headers(),
  });

  return await respuesta.json();

}