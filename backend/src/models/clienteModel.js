import pool from "../config/database.js";

export async function obtenerClientes() {
  const [rows] = await pool.execute(
    "SELECT * FROM clientes ORDER BY id_cliente DESC"
  );

  return rows;
}

export async function obtenerCliente(id) {
  const [rows] = await pool.execute(
    "SELECT * FROM clientes WHERE id_cliente=?",
    [id]
  );

  return rows[0];
}

export async function crearCliente(cliente) {
  const {
    nombre,
    apellido,
    telefono,
    correo,
    direccion,
  } = cliente;

  const [resultado] = await pool.execute(
    `INSERT INTO clientes
    (
      nombre,
      apellido,
      telefono,
      correo,
      direccion
    )
    VALUES (?,?,?,?,?)`,
    [
      nombre,
      apellido,
      telefono,
      correo,
      direccion,
    ]
  );

  return resultado.insertId;
}

export async function actualizarCliente(id, cliente) {
  const {
    nombre,
    apellido,
    telefono,
    correo,
    direccion,
  } = cliente;

  const [resultado] = await pool.execute(
    `UPDATE clientes
     SET
      nombre=?,
      apellido=?,
      telefono=?,
      correo=?,
      direccion=?
     WHERE id_cliente=?`,
    [
      nombre,
      apellido,
      telefono,
      correo,
      direccion,
      id,
    ]
  );

  return resultado.affectedRows;
}

export async function cambiarEstadoCliente(id, estado) {
  const [resultado] = await pool.execute(
    `UPDATE clientes
     SET estado=?
     WHERE id_cliente=?`,
    [estado, id]
  );

  return resultado.affectedRows;
}