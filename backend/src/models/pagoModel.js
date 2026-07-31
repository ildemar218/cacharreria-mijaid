import pool from "../config/database.js";

export async function registrarPago(pago) {

  const {
    id_pedido,
    metodo_pago,
    valor_pagado,
    cambio
  } = pago;

  const [resultado] = await pool.execute(
    `INSERT INTO pagos
    (
      id_pedido,
      metodo_pago,
      valor_pagado,
      cambio
    )
    VALUES (?,?,?,?)`,
    [
      id_pedido,
      metodo_pago,
      valor_pagado,
      cambio
    ]
  );

  return resultado.insertId;

}

export async function listarPagos() {

  const [rows] = await pool.execute(
    `SELECT
        pa.*,
        p.total,
        c.nombre,
        c.apellido
     FROM pagos pa
     INNER JOIN pedidos p
        ON pa.id_pedido = p.id_pedido
     INNER JOIN clientes c
        ON p.id_cliente = c.id_cliente
     ORDER BY pa.id_pago DESC`
  );

  return rows;

}

export async function obtenerFactura(id_pedido) {

  const [pedido] = await pool.execute(
    `SELECT
        p.id_pedido,
        p.fecha_pedido,
        p.total,
        p.estado,
        c.nombre,
        c.apellido,
        pa.metodo_pago,
        pa.valor_pagado,
        pa.cambio,
        pa.fecha_pago
     FROM pedidos p
     INNER JOIN clientes c
        ON p.id_cliente = c.id_cliente
     LEFT JOIN pagos pa
        ON pa.id_pedido = p.id_pedido
     WHERE p.id_pedido = ?`,
    [id_pedido]
  );

  if (pedido.length === 0) {

    return null;

  }

  const [detalle] = await pool.execute(
    `SELECT
        pr.nombre,
        d.cantidad,
        d.precio_unitario,
        d.subtotal
     FROM detalle_pedido d
     INNER JOIN productos pr
        ON pr.id_producto = d.id_producto
     WHERE d.id_pedido = ?`,
    [id_pedido]
  );

  return {

    pedido: pedido[0],

    detalle

  };

}