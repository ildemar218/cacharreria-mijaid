import pool from "../config/database.js";

/**
 * Buscar un usuario por su correo
 */
export async function buscarUsuarioPorCorreo(correo) {
  const [rows] = await pool.execute(
    `SELECT * FROM usuarios
     WHERE correo = ?
     AND estado = TRUE`,
    [correo]
  );

  return rows[0];
}

/**
 * Obtener todos los usuarios
 */
export async function obtenerUsuarios() {
  const [rows] = await pool.execute(
    `SELECT
        id_usuario,
        nombre,
        apellido,
        correo,
        rol,
        estado,
        fecha_creacion
     FROM usuarios
     ORDER BY id_usuario ASC`
  );

  return rows;
}

/**
 * Obtener un usuario por ID
 */
export async function obtenerUsuarioPorId(id) {
  const [rows] = await pool.execute(
    `SELECT
        id_usuario,
        nombre,
        apellido,
        correo,
        rol,
        estado,
        fecha_creacion
     FROM usuarios
     WHERE id_usuario = ?`,
    [id]
  );

  return rows[0];
}

/**
 * Crear usuario
 */
export async function crearUsuario(usuario) {
  const { nombre, apellido, correo, password, rol } = usuario;

  const [resultado] = await pool.execute(
    `INSERT INTO usuarios
    (
        nombre,
        apellido,
        correo,
        password,
        rol
    )
    VALUES (?, ?, ?, ?, ?)`,
    [nombre, apellido, correo, password, rol]
  );

  return resultado.insertId;
}

/**
 * Actualizar usuario
 */
export async function actualizarUsuario(id, usuario) {
  const { nombre, apellido, correo, rol } = usuario;

  const [resultado] = await pool.execute(
    `UPDATE usuarios
     SET
        nombre = ?,
        apellido = ?,
        correo = ?,
        rol = ?
     WHERE id_usuario = ?`,
    [nombre, apellido, correo, rol, id]
  );

  return resultado.affectedRows;
}

/**
 * Activar / Desactivar usuario
 */
export async function cambiarEstadoUsuario(id, estado) {
  const [resultado] = await pool.execute(
    `UPDATE usuarios
     SET estado = ?
     WHERE id_usuario = ?`,
    [estado, id]
  );

  return resultado.affectedRows;
}