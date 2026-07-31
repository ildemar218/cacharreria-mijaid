import pool from "../config/database.js";

export async function obtenerCategorias() {
  const [rows] = await pool.execute(
    "SELECT * FROM categorias ORDER BY id_categoria DESC"
  );

  return rows;
}

export async function crearCategoria(categoria) {
  const [resultado] = await pool.execute(
    "INSERT INTO categorias(nombre) VALUES(?)",
    [categoria.nombre]
  );

  return resultado.insertId;
}