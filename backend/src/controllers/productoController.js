import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    cambiarEstadoProducto,
  } from "../models/productoModel.js";
  
  export async function listarProductos(req, res) {
    try {
      res.json(await obtenerProductos());
    } catch (error) {
        console.error(error);
    
        res.status(500).json({
            mensaje: error.message,
        });
    }
  }
  
  export async function obtenerProducto(req, res) {
    try {
      const producto = await obtenerProductoPorId(req.params.id);
  
      if (!producto) {
        return res.status(404).json({
          mensaje: "Producto no encontrado",
        });
      }
  
      res.json(producto);
    } catch (error) {
        console.error(error);
    
        res.status(500).json({
            mensaje: error.message,
        });
    }
  }
  
  export async function registrarProducto(req, res) {
    try {
  
      console.log("Datos recibidos:");
      console.log(req.body);
  
      const id = await crearProducto(req.body);
  
      res.status(201).json({
        mensaje: "Producto creado correctamente",
        id_producto: id,
      });
  
    } catch (error) {
  
      console.error("ERROR AL CREAR PRODUCTO:");
      console.error(error);
  
      res.status(500).json({
        mensaje: error.message,
      });
  
    }
  }
  
  export async function editarProducto(req, res) {
    try {
      await actualizarProducto(req.params.id, req.body);
  
      res.json({
        mensaje: "Producto actualizado correctamente",
      });
    } catch (error) {
        console.error(error);
    
        res.status(500).json({
            mensaje: error.message,
        });
    }
  }
  
  export async function cambiarEstado(req, res) {
    try {
      await cambiarEstadoProducto(
        req.params.id,
        req.body.estado
      );
  
      res.json({
        mensaje: "Estado actualizado",
      });
    } catch (error) {
        console.error(error);
    
        res.status(500).json({
            mensaje: error.message,
        });
    }
  }