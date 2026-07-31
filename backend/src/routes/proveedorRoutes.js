import { Router } from "express";

import {
  listarProveedores,
  obtenerProveedorPorId,
  registrarProveedor,
  editarProveedor,
  cambiarEstado,
} from "../controllers/proveedorController.js";

const router = Router();

router.get("/", listarProveedores);

router.get("/:id", obtenerProveedorPorId);

router.post("/", registrarProveedor);

router.put("/:id", editarProveedor);

router.patch("/:id/estado", cambiarEstado);

export default router;