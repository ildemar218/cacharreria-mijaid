import pool from "../config/database.js";

export async function obtenerPedidos() {
  const [rows] = await pool.execute(`
    SELECT
      p.id_pedido,
      p.fecha_pedido,
      p.estado,
      p.total,
      c.nombre,
      c.apellido
    FROM pedidos p
    INNER JOIN clientes c
      ON p.id_cliente = c.id_cliente
    ORDER BY p.id_pedido DESC
  `);

  return rows;
}

export async function crearPedido(pedido) {
  const { id_cliente } = pedido;

  const [resultado] = await pool.execute(
    `INSERT INTO pedidos
    (id_cliente)
    VALUES(?)`,
    [id_cliente]
  );

  return resultado.insertId;
}

export async function actualizarTotal(id_pedido, total) {
  await pool.execute(
    `UPDATE pedidos
     SET total=?
     WHERE id_pedido=?`,
    [total, id_pedido]
  );
}