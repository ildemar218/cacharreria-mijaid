import { agregarDetalle } from "../models/detallePedidoModel.js";
import { actualizarTotal } from "../models/pedidoModel.js";
import pool from "../config/database.js";

export async function registrarDetalle(req, res) {

  try {

    const subtotal = await agregarDetalle(req.body);

    const [rows] = await pool.execute(
      `SELECT SUM(subtotal) total
       FROM detalle_pedido
       WHERE id_pedido=?`,
      [req.body.id_pedido]
    );

    await actualizarTotal(
      req.body.id_pedido,
      rows[0].total
    );

    res.status(201).json({
      mensaje: "Producto agregado al pedido"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: error.message
    });

  }

}