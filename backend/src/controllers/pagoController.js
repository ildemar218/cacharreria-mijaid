import {
    registrarPago,
    listarPagos,
    obtenerFactura,
  } from "../models/pagoModel.js";
  
  import {
    obtenerPedidoPorId,
    marcarPedidoPagado,
  } from "../models/pedidoModel.js";
  
  export async function crearPago(req, res) {
  
    try {
  
      const pedido = await obtenerPedidoPorId(req.body.id_pedido);
  
      if (!pedido) {
        return res.status(404).json({
          mensaje: "Pedido no encontrado",
        });
      }
  
      if (pedido.estado === "Pagado") {
        return res.status(400).json({
          mensaje: "Este pedido ya fue pagado",
        });
      }
  
      if (Number(req.body.valor_pagado) < Number(pedido.total)) {
        return res.status(400).json({
          mensaje: "El valor recibido es menor al total del pedido",
        });
      }
  
      const cambio =
        Number(req.body.valor_pagado) - Number(pedido.total);
  
      const id = await registrarPago({
  
        ...req.body,
  
        cambio,
  
      });
  
      await marcarPedidoPagado(req.body.id_pedido);
  
      res.status(201).json({
  
        mensaje: "Pago registrado correctamente",
  
        id_pago: id,
  
        cambio,
  
      });
  
    } catch (error) {
  
      console.error(error);
  
      res.status(500).json({
        mensaje: error.message,
      });
  
    }
  
  }
  
  export async function obtenerPagos(req, res) {
  
    try {
  
      const pagos = await listarPagos();
  
      res.json(pagos);
  
    } catch (error) {
  
      console.error(error);
  
      res.status(500).json({
        mensaje: error.message,
      });
  
    }
  
  }
  
  export async function verFactura(req, res) {
  
    try {
  
      const factura = await obtenerFactura(req.params.id);
  
      if (!factura) {
  
        return res.status(404).json({
          mensaje: "Factura no encontrada"
        });
  
      }
  
      res.json(factura);
  
    } catch (error) {
  
      console.error(error);
  
      res.status(500).json({
        mensaje: error.message,
      });
  
    }
  
  }