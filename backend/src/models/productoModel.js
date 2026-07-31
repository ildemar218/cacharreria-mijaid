import pool from "../config/database.js";

export async function obtenerProductos() {
  const [rows] = await pool.execute(`
    SELECT
      p.id_producto,
      p.nombre,
      p.descripcion,
      p.stock,
      p.precio_compra,
      p.precio_venta,
      p.estado,
      p.codigo_barras,
      p.id_proveedor,
      pr.nombre_empresa AS proveedor
    FROM productos p
    INNER JOIN proveedores pr
      ON p.id_proveedor = pr.id_proveedor
    ORDER BY p.id_producto DESC
  `);

  return rows;
}

export async function obtenerProductoPorId(id) {
  const [rows] = await pool.execute(
    `SELECT * FROM productos WHERE id_producto=?`,
    [id]
  );

  return rows[0];
}

export async function crearProducto(producto) {
    const {
        nombre,
        descripcion,
        stock,
        precio_compra,
        precio_venta,
        id_proveedor,
        id_categoria,
        codigo_barras,
      } = producto;

  const [resultado] = await pool.execute(
            `INSERT INTO productos
    (
    nombre,
    descripcion,
    stock,
    precio_compra,
    precio_venta,
    id_proveedor,
    id_categoria,
    codigo_barras
    )
    VALUES (?,?,?,?,?,?,?,?)`,
    [
        nombre,
        descripcion,
        stock,
        precio_compra,
        precio_venta,
        id_proveedor,
        id_categoria,
        codigo_barras,
      ]
  );

  return resultado.insertId;
}

export async function actualizarProducto(id, producto) {
  const {
    nombre,
    descripcion,
    stock,
    precio_compra,
    precio_venta,
    id_proveedor,
    codigo_barras,
  } = producto;

  const [resultado] = await pool.execute(
    `UPDATE productos
     SET
      nombre=?,
      descripcion=?,
      stock=?,
      precio_compra=?,
      precio_venta=?,
      id_proveedor=?,
      codigo_barras=?
     WHERE id_producto=?`,
    [
      nombre,
      descripcion,
      stock,
      precio_compra,
      precio_venta,
      id_proveedor,
      codigo_barras,
      id,
    ]
  );

  return resultado.affectedRows;
}

export async function cambiarEstadoProducto(id, estado) {
  const [resultado] = await pool.execute(
    `UPDATE productos
     SET estado=?
     WHERE id_producto=?`,
    [estado, id]
  );

  return resultado.affectedRows;
}