import {
    obtenerPedidos,
    crearPedido,
  } from "../models/pedidoModel.js";
  
  export async function listarPedidos(req, res) {
    try {
      res.json(await obtenerPedidos());
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: error.message,
      });
    }
  }
  
  export async function registrarPedido(req, res) {
    try {
      const id = await crearPedido(req.body);
  
      res.status(201).json({
        mensaje: "Pedido creado",
        id_pedido: id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: error.message,
      });
    }
  }