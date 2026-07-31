import pool from "../config/database.js";

export async function agregarDetalle(detalle) {

  const {
    id_pedido,
    id_producto,
    cantidad
  } = detalle;

  const [producto] = await pool.execute(
    `SELECT precio_venta, stock
     FROM productos
     WHERE id_producto=?`,
    [id_producto]
  );

  if (producto.length === 0) {
    throw new Error("Producto no encontrado");
  }

  if (producto[0].stock < cantidad) {
    throw new Error("Stock insuficiente");
  }

  const precio = producto[0].precio_venta;
  const subtotal = precio * cantidad;

  await pool.execute(
    `INSERT INTO detalle_pedido
    (
      id_pedido,
      id_producto,
      cantidad,
      precio_unitario,
      subtotal
    )
    VALUES(?,?,?,?,?)`,
    [
      id_pedido,
      id_producto,
      cantidad,
      precio,
      subtotal
    ]
  );

  await pool.execute(
    `UPDATE productos
     SET stock = stock - ?
     WHERE id_producto=?`,
    [
      cantidad,
      id_producto
    ]
  );

  return subtotal;

}