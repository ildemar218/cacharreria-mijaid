const API = "http://localhost:3000/api/proveedores";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function obtenerProveedores() {
  const respuesta = await fetch(API, {
    headers: headers(),
  });

  return await respuesta.json();
}

export async function crearProveedor(proveedor) {
  const respuesta = await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(proveedor),
  });

  return await respuesta.json();
}

export async function listarProveedores() {
    const respuesta = await fetch(API, {
      headers: headers(),
    });
  
    return await respuesta.json();
  }