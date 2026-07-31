import {
    obtenerProveedores,
    obtenerProveedor,
    crearProveedor,
    actualizarProveedor,
    cambiarEstadoProveedor,
  } from "../models/proveedorModel.js";
  
  export async function listarProveedores(req, res) {
    try {
      const proveedores = await obtenerProveedores();
      res.json(proveedores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function obtenerProveedorPorId(req, res) {
    try {
      const proveedor = await obtenerProveedor(req.params.id);
  
      if (!proveedor) {
        return res.status(404).json({
          mensaje: "Proveedor no encontrado",
        });
      }
  
      res.json(proveedor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function registrarProveedor(req, res) {
    try {
      const id = await crearProveedor(req.body);
  
      res.status(201).json({
        mensaje: "Proveedor registrado correctamente",
        id_proveedor: id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function editarProveedor(req, res) {
    try {
      await actualizarProveedor(req.params.id, req.body);
  
      res.json({
        mensaje: "Proveedor actualizado correctamente",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function cambiarEstado(req, res) {
    try {
      await cambiarEstadoProveedor(
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