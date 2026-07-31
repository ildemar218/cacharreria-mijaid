import {
    obtenerCategorias,
    crearCategoria,
  } from "../models/categoriaModel.js";
  
  export async function listarCategorias(req, res) {
    try {
      res.json(await obtenerCategorias());
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
  
  export async function registrarCategoria(req, res) {
    try {
      const id = await crearCategoria(req.body);
  
      res.status(201).json({
        mensaje: "Categoría registrada",
        id_categoria: id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }