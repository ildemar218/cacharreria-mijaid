import { Router } from "express";

import {
  listarProductos,
  obtenerProducto,
  registrarProducto,
  editarProducto,
  cambiarEstado,
} from "../controllers/productoController.js";

const router = Router();

router.get("/", listarProductos);

router.get("/:id", obtenerProducto);

router.post("/", registrarProducto);

router.put("/:id", editarProducto);

router.patch("/:id/estado", cambiarEstado);

export default router;