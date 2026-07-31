import {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
    cambiarEstadoCliente,
  } from "../models/clienteModel.js";
  
  export async function listarClientes(req, res) {
    try {
      res.json(await obtenerClientes());
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function obtenerClientePorId(req, res) {
    try {
      const cliente = await obtenerCliente(req.params.id);
  
      if (!cliente) {
        return res.status(404).json({
          mensaje: "Cliente no encontrado",
        });
      }
  
      res.json(cliente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function registrarCliente(req, res) {
    try {
      const id = await crearCliente(req.body);
  
      res.status(201).json({
        mensaje: "Cliente registrado correctamente",
        id_cliente: id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function editarCliente(req, res) {
    try {
      await actualizarCliente(req.params.id, req.body);
  
      res.json({
        mensaje: "Cliente actualizado correctamente",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function cambiarEstado(req, res) {
    try {
      await cambiarEstadoCliente(
        req.params.id,
        req.body.estado
      );
  
      res.json({
        mensaje: "Estado actualizado correctamente",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }